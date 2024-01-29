import React, { useContext, useState } from 'react';
import NoteContext from '../Context/notes/NoteContext';
import { MdTitle } from 'react-icons/md';

const AddNote = (props) => {
    const context = useContext(NoteContext)
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleOnClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("New Note Added", "success")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className="container-fluid">
            <form className = "add-note-form mx-auto">
                <h1 className='form-title text-center'> Add Note </h1>
                <div className="form-group">
                    <label className='fw-semibold ml-5 mt-3' htmlFor="title"> Title</label>
                    <input type="text" className="form-control my-2" id="title" value={note.title} name="title" aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                </div>
                <div className="form-group my-3">
                    <label className='fw-semibold mt-3' htmlFor="description">Description</label>
                    <textarea type="text" className="form-control my-2" id="description" value={note.description} name="description" onChange={onChange} minLength={5} required />
                </div>
                <div className="form-group my-3">
                    <label className='fw-semibold mt-3' htmlFor="tag">Tag</label>
                    <input type="text" className="form-control my-2" id="tag" value={note.tag} name="tag" onChange={onChange} minLength={4} required />
                </div>
                <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn button mt-5" onClick={handleOnClick}> Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
