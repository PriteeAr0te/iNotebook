import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom'

const Login = (props) => {
  const [credentials, setCredentials] = useState({email:"", password:""})

  // replacing useHistory hook in v5 with useNavigate 
  let navigate = useNavigate()
    const handleSubmit = async(e) =>{
        e.preventDefault();
       try{
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({email:credentials.email, password:credentials.password}),
        });
        const json = await response.json();
        // console.log(json)
        if(json.success){
          //redirect
          localStorage.setItem('token', json.authtoken)
          props.showAlert("Login Successfully", "success")
          navigate('/')
        }
        else{
          props.showAlert("Invalid Username or Password", "danger")
        }
       }
       catch(error){
        console.error(error);
       }
      }

      const onChange = (e) =>{
        setCredentials({...credentials,[e.target.name]: e.target.value})
    }

  return (
    <div className="container mt-3">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2>Login To Continue iNotebook</h2>
        <form onSubmit ={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" onChange = {onChange} value = {credentials.email} name = "email" id="email" placeholder="Enter email" required/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" onChange = {onChange} value = {credentials.password} name = "password" id="password" placeholder="Enter password" required/>
          </div>
          <button type="submit" className="btn btn-primary my-3">Login</button>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Login

