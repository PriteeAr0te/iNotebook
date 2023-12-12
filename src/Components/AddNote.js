import React, {useContext, useState}  from 'react';
import NoteContext from '../Context/notes/NoteContext';

const AddNote = (props) => {
    const context = useContext(NoteContext)
    const {addNote} = context;
    const [note, setNote] = useState({title:"", description:"", tag:""}) 

    const handleOnClick = (e) =>{
        e.preventDefault()
        addNote(note.title, note.description, note.tag);
        setNote({title:"", description:"", tag:""})
        props.showAlert("New Note Added", "success")
    }

    const onChange = (e) =>{
        setNote({...note,[e.target.name]: e.target.value})
    }

  return (
    <div className="container">
      <h1> Add Note </h1>
        <div className="container my-3">
            <form>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control my-2" id="title" value = {note.title} name = "title" aria-describedby="emailHelp" onChange = {onChange} minLength ={5} required/>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control my-2" id="description" value = {note.description} name = "description" onChange = {onChange} minLength = {5} required />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="tag">Tag</label>
                    <input type="text" className="form-control my-2" id="tag" value = {note.tag} name = "tag" onChange = {onChange} minLength = {4} required/>
                </div>
                <button disabled ={note.title.length<5 || note.description.length< 5} type="submit" className="btn btn-primary" onClick={handleOnClick}> Add Note</button>
            </form>
        </div>
    </div>
  )
}

export default AddNote
