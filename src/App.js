import React from 'react'
import './App.css';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './Context/notes/NoteState';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { useState } from 'react';

function App() {
  const[alert, setAlert] = useState(null);

  const showAlert = (message,type) => {                                                                                                                         
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null);
    },2000)
  }
  return (
    <>
      <NoteState>
      <BrowserRouter>
      <Navbar/>
      <Alert alert = {alert}/>
      <div className="container my-3">
      <Routes>
        <Route path="/" element={<Home showAlert = {showAlert}/>} />
        <Route path="/login" element={<Login showAlert = {showAlert}/>} />
        <Route path="/signup" element={<Signup showAlert = {showAlert}/>} />
      </Routes>
      </div>
    </BrowserRouter>
    </NoteState>

    </>
  );
}

export default App;