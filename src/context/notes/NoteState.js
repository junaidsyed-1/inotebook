import NoteContext from "./noteContext";
import React, { useState } from "react"

const NoteState = (props) => {
    const HOST1 = "https://inotebookbackend-y8kj.onrender.com"
    const [notes, setNotes] = useState([])

    const getAllNotes = async () => {
        // API call
        const response = await fetch(`${HOST1}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setNotes(json)
    }

    // Add a Note
    const addNote = async (title, description, tag) => {
        // API call
        const response = await fetch(`${HOST1}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note))
    }

    // Delete a Notes

    const deleteNote = async (id) => {
        console.log('deleting')
        // API 
        const response = await fetch(`${HOST1}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json()
        // console.log(json);

        // console.log("Deleting a note with Id " + id)
        let newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    // EDIT a Note
    const editNote = async (id, title, description, tag) => {
        // API call
        // console.log(id)
        const response = await fetch(`${HOST1}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })

        });
        const json = response.json();

        let newNotes = JSON.parse(JSON.stringify(json))

        // Logic to edit note
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.etitle = title;
                element.edescription = description;
                element.etag = tag
                break;
            }
        }
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState