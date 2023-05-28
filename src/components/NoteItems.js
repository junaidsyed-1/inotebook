import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'


const NoteItems = (props) => {
    const context = useContext(noteContext)
    const { deleteNote } = context;
    const { updateNote, note } = props

    return (
        <div className="col-md-6">
            <div className="card my-4">
                <div className="card-header">
                    <b>Tag :</b>  {note.tag}
                </div>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <div className="d-flex">
                        <button className="btn btn-primary" onClick={() => { deleteNote(note._id) }} >Delete</button>
                        <button className="btn btn-primary mx-3" onClick={() => { updateNote(note) }}>Edit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteItems