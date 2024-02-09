import React, {useContext, useEffect, useRef, useState} from 'react'
import NoteContext from '../Context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import {useNavigate } from 'react-router-dom'

const Notes = (props) => {
    let navigate = useNavigate()
    const context = useContext(NoteContext)
    const {notes, getNotes, editNote} = context;
    useEffect(()=>{
        if(localStorage.getItem('token')){
            getNotes();
        }else {
            navigate("/login");
        }
    },[])
    
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({id: "", etitle:"", edescription:"", etag:""}) 

    const updateNote = (currentNote) =>{
        ref.current.click();
        setNote({id: currentNote._id, etitle:currentNote.title, edescription:currentNote.description,etag:currentNote.tag})
    }


    const handleOnClick = (e) =>{
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        // addNote(note.title, note.description, note.tag);
        props.showAlert("Note Updated Successfully", "success")
    }

    const onChange = (e) =>{
        setNote({...note,[e.target.name]: e.target.value})
    }

  return (
    <>
    <AddNote showAlert = {props.showAlert}/>
        <button ref ={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="form-title text-center" id="exampleModalLabel">Edit Note</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
        
            <form>
                <div className="form-group">
                    <label className="fw-semibold mt-3"  htmlFor="title">Title</label>
                    <input type="text" className="form-control my-2" id="etitle" value ={note.etitle} name = "etitle" aria-describedby="emailHelp" onChange = {onChange} minLength = {5} required/>
                </div>
                <div className="form-group my-3">
                    <label className="fw-semibold mt-3" htmlFor="description">Description</label>
                    <textarea type="text" className="form-control my-2" id="edescription" value ={note.edescription} name = "edescription" onChange = {onChange} minLength = {5} required/>
                </div>
                <div className="form-group my-3">
                    <label className="fw-semibold mt-3" htmlFor="tag">Tag</label>
                    <input type="text" className="form-control my-2" id="etag" value ={note.etag} name = "etag" onChange = {onChange} minLength = {4} required/>
                </div>
            </form>
        </div>
            <div className="modal-footer">
                {/* <button ref = {refClose} type="button" className="btn button" data-bs-dismiss="modal">Close</button> */}
                <button disabled ={note.etitle.length<5 || note.edescription.length < 5} type="button" onClick ={handleOnClick} className="btn button">Update Note</button>
            </div>
            </div>
            </div>
        </div>
        
        <div className="row my-3 mt-5"  style={{color: "white"}}>
                <h1 className='text-center form-title mt-5'> Your Notes </h1>
                <div className="container mx-2"  style={{color:"white"}}>
                {/* {notes.length === 0 && "No Notes to display"} */}
                {Array.isArray(notes) && notes.length === 0 && "No Notes to display"}

                </div>
                   
            {Array.isArray(notes) && notes.length > 0 ? (
                notes.map((note)=>{
                    return <NoteItem key ={note._id} updateNote = {updateNote} note = {note} showAlert = {props.showAlert}/>
                })
            ):(
                <p  style={{color:"white"}}>No Notes to display</p>
            )}
        </div>
    </>
  )
}

export default Notes
