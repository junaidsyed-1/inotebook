import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItems from './NoteItems';
import AddNote from './AddNote';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
    const context = useContext(noteContext)
    const { notes, getAllNotes, editNote } = context;
    const [note, setNote] = useState({ id: '', etitle: '', edescription: '', etag: "" })
    const ref = useRef(null)
    const refClose = useRef(null)
    let navigate = useNavigate()

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }

    const onHandleButton = (event) => {
        // console.log("updating the note", note.id)
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click()

        setTimeout(() => {
            getAllNotes()
        }, 500);
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
        else {

            getAllNotes()
        }
    }, []);

    if (!localStorage.getItem('token')) {
        return null; // Render nothing if user is not logged in
    }

    return (
        <>
            <AddNote />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Your Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body ">
                            <form >
                                <div className="mb-3 my-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" value={note.edescription} name='edescription' onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 3 || note.edescription.length < 5 ? true : false} type="submit" className="btn btn-primary" onClick={onHandleButton}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3 mx-auto" >
                <h2>Your Notes</h2>
                <p>{notes.length === 0 && 'No Notes to Display'}</p>
                {notes.map((note) => {
                    const uniqueId = uuidv4()
                    return <NoteItems key={uniqueId} note={note} updateNote={updateNote} />
                })}
            </div>
        </>
    )
}

export default Notes
