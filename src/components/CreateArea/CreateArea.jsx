import { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import './CreateArea.css';
import Zoom from '@mui/material/Zoom';
import IconButton from '@mui/material/IconButton';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function CreateArea({ onAdd }) {
    // Note:
    const initialNoteState = {title: "", content: ""};
    const [note, setNote] = useState(initialNoteState);

    // Empty note alert:
    const [emptyNoteAlert, setEmptyNoteAlert] = useState(false);

    // Form appearance:
    const [formExpanded, setFormExpanded] = useState(false);
    const toggleForm = useCallback(() => {
        setFormExpanded(prevFormExpanded => !prevFormExpanded);
    }, []);

    // Handling inputs:
    function handleInputs({target: {name, value}}) {
        setFormExpanded(value.length > 0);
        setNote(prevNote => ({...prevNote, [name]: value}));
    }

    // Submitting note:
    function submitNote(event) {
        event.preventDefault();
        onAdd(note);
        setNote(initialNoteState);
        setFormExpanded(false);
    }

    // Validating note:
    function validateNote(event) {
        if (note.title.trim() === "" && note.content.trim() === "") {
            event.preventDefault();
            setEmptyNoteAlert(true);
        } else submitNote(event);
    }

    // Form toggling to enhance UE:
    useEffect(() => {
        function isAestetic(event) {
            return (
                // Click outside of input/note, form empty:
                (event.type === 'click' &&
                !event.target.closest('.input') &&
                !event.target.closest('.note') &&
                note.title === "" && note.content === "") ||

                // Click in input, form collapsed:
                (event.type === 'click' &&
                event.target.closest('.input') &&
                !formExpanded) ||

                // Click in note, form empty and expanded:
                (event.type === 'click' &&
                event.target.closest('.note') &&
                formExpanded &&
                note.title === "" && note.content === "")
            );
        }

        function aesteticToggle(event) {
            isAestetic(event) && toggleForm();
        }

        // Mouniting listeners:
        document.addEventListener('click', aesteticToggle);
        window.addEventListener('keydown', aesteticToggle);

        // Listeners cleanup:
        return () => {
            document.removeEventListener('click', aesteticToggle);
            window.removeEventListener('keydown', aesteticToggle);
        }
    }, [formExpanded, note, toggleForm]);

    // Automatic input focusing:
    const inputRef = useRef(null);
    useRef(() => {
        inputRef.current && inputRef.current.focus();
    }, [formExpanded]);

    // Form:
    return (
        <main>
            <form
                onSubmit={validateNote}
                onKeyDown={event => event.key === 'Enter' && validateNote(event)}
            >
                <input
                    onChange={handleInputs}
                    placeholder={formExpanded ? "Your title..." : "Start your new note here..."}
                    aria-label={formExpanded ? "note title input field" : "new note input field"}
                    name='title'
                    value={note.title}
                    ref={inputRef}
                    maxLength={18}
                    className='input'
                    type='text'
                />

                {formExpanded && <textarea
                    onChange={handleInputs}
                    placeholder="Your content..."
                    aria-label="note content input field"
                    name='content'
                    value={note.content}
                    rows={3}
                    className='input'
                />}

                <Zoom in={formExpanded}>
                    <IconButton
                        aria-label="add button"
                        size="large"
                        className='form-button'
                        type='submit'
                    >
                        <NoteAddOutlinedIcon />
                    </IconButton>
                </Zoom>
            </form>

            <div className='alert-container'>
                <Snackbar
                    open={emptyNoteAlert}
                    autoHideDuration={1500}
                    onClose={() => setEmptyNoteAlert(false)}
                >
                    <Alert
                        elevation={6}
                        severity='warning'
                        onClose={() => setEmptyNoteAlert(false)}
                    >
                        Write something to save your note
                    </Alert>
                </Snackbar>
            </div>
        </main>
    );
}

CreateArea.propTypes = {
    onAdd: PropTypes.func.isRequired
}

export default CreateArea;