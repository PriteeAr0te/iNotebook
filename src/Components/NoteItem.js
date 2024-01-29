import React, {useContext}  from 'react';
import NoteContext from '../Context/notes/NoteContext';

const NoteItem = (props) => {
    const context = useContext(NoteContext)
    const {deleteNote} = context;
    const{note, updateNote} = props;
  return (
    <div className="col-sm-4 mb-3 mb-sm-0 my-3">
      <div className="card text-bg-light my-3">
      <div className="card-header d-flex justify-content-between align-items-center">
        <span> {note.tag} </span>
          <div>
          <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Note Deleted", "success")}}></i>
          <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
          </div>
      </div>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          
        </div>
      </div>
    </div>
  )
}

export default NoteItem
//mb-sm-0  sm-6