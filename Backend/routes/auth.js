const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
router.use(express.json())

const JWT_SECRET = "youareverry$pretty";
let success = false;

//ROUTE1: create a user using: POST "/api/auth/createuser" .No login required

router.post('/createuser',[
  body('name', 'Enter Your Name').isLength({ min: 2 }),
  body('email','Enter Valid email').isEmail(),
  body('password','Email must be greater than 5 characters').isLength({ min: 5 }),
    body('confirmPassword', 'Passwords do not match').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
  ], async(req,res)=>{
    //If there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    try{
      // check whether the user with this email exists already
      let user = await User.findOne({email: req.body.email});
      if(user){
        success = false;
        return res.status(400).json({success, error:'User with this account already exist'});
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password,salt);

        user= await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user:{
          id:user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authtoken});
    }
    catch(error){
      console.error(error.message)
      res.status(500).send("Internal server error")
    }
})

//ROUTE2: Authenticate a user using: POST "/api/auth/login" .No login required
router.post('/login',[
  body('email','Enter Valid email').isEmail(),
  body('password','password can not be blank').exists()
], async(req,res)=>{
  let success = false;
  //If there are errors return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array() });
  }
  const {email,password} = req.body
  try{
    let user = await User.findOne({email})
    if(!user){
      success = false
      return res.status(400).json({success, error:"Please enter valid email"});

    }
    const passwordCompare = await bcrypt.compare(password,user.password);
    if(!passwordCompare){
      success = false
      return res.status(400).json({success, error:"Invalid Password"});
    }

    const data = {
      user:{
        id:user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({success, authtoken});

  }catch(error){
    console.error(error.message)
    success = false;
    res.status(500).json({success, error:"Internal server error"});
  }

})


//ROUTE 3: Get a user using loggedin : POST "/api/auth/getuser" . login required
router.post('/getuser', fetchuser, async(req,res)=>{

  try {
    user = req.user.id
    // userId = req.user.id
    // const user = await User.findById(userId).select("-password")
    const user = await User.findById(user).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message)
    success = false;
    res.status(500).json({success, error:"Internal server error"});
  }
})

module.exports = router;

