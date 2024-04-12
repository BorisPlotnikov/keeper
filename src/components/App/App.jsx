import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import CreateArea from '../CreateArea/CreateArea';
import Note from '../Note/Note';

function App() {
    const [notes, setNotes] = useState([]);

    const addNote = newNote => {
        if (newNote.title.trim() !== "" || newNote.content.trim() !== "") {
            newNote.key = uuidv4();
            newNote.id = uuidv4();
            setNotes(prevNotes => [...prevNotes, newNote]);
        }
    }

    const deleteNote = refId => {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== refId));
    }

    return (
        <main>
            <Header />
            <CreateArea onAdd={addNote} />
            {notes.map(note => <Note
                key={note.key}
                id={note.id}
                title={note.title}
                content={note.content}
                onDelete={deleteNote}
            />)}
            <Footer />
        </main>
    );
}

export default App;