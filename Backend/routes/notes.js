const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const router = express.Router();

//ROUTE 1: Get all noted : GET "/api/notes/fetchallnotes" . login required
let success = false
router.get("/fetchallnotes", fetchuser, async (req, res) => {
 try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
 }  catch(error){
    console.error(error.message)
    res.status(500).json({ success: false, error: "Internal server error" });
  }
})

//ROUTE 2: Add a note  : POST "/api/notes/addnote" . login required
router.post("/addnote", fetchuser, [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body(
      "description",
      "description must be greater than 5 characters"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
        const { title, description, tag } = req.body;
    //If there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    const note = new Notes({
      title, description, tag, user: req.user.id,
    });
    const savedNote = await note.save()
    success = true;
    res.json(success, savedNote);
    
    }  catch(error){
        console.error(error.message)
        res.status(500).json({success:false, error:"Internal server error"})
      }
    
  })

  //ROUTE 3: Update an existing note  : PUT "/api/notes/updatenote" . login required

  router.put("/updatenote/:id", fetchuser, async (req, res) => {
    const {title, description, tag} = req.body;
    try {
    const newNote = {}
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    //find the note to be updated and update it 
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(500).json({ success: false, error: "not found"});}

    if(note.user.toString() !== req.user.id){
        return res.status(401).json({error:"Not Allowed"})
    }
    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    success = true;
    res.json({success, note});
    }  catch(error){
    console.error(error.message)
    res.status(500).json({ success: false, error: "Internal server error" });
  }

  })

  //ROUTE 4: Delete an existing note  : PUT "/api/notes/deletenote" . login required

  router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
    //find the note to be deleted and delete it 
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).json({error:"not found"})}

    //Allow deletion only if user owns this note 
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }
    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success": "Your note has been deleteted successfully!", note: note});
  } catch(error){
    console.error(error.message)
    res.status(500).send("Internal server error")
  }

  });

module.exports = router;
