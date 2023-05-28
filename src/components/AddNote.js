import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = () => {
    const context = useContext(noteContext)
    const { addNote } = context;
    const [note, setNote] = useState({ title: '', description: '', tag: "" });


    const onChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value })
    }

    const onHandleButton = (event) => {
        event.preventDefault()
        addNote(note.title, note.description, note.tag);
        setNote({ title: '', description: '', tag: '' });
    }
    return (
        <div>
            <div className="container my-3 mx-auto">
                <h2>Add a Note</h2>
                <form >
                    <div className="mb-3 my-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' value={note.title} aria-describedby="title" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" value={note.description} name='description' onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" placeholder="optional" value={note.tag} name='tag' onChange={onChange} />
                    </div>
                    <button disabled={note.title.length < 3 || note.description.length < 5 ? true : false} type="button" className="btn btn-primary" onClick={onHandleButton}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
