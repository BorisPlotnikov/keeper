import './Note.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Zoom from '@mui/material/Zoom';
import IconButton from '@mui/material/IconButton';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

function Note({ id, title, content, onDelete }) {
    const [isMouseOver, setIsMouseOver] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsMouseOver(true)}
            onMouseLeave={() => setIsMouseOver(false)}
            className="note"
        >
            <h1>{title}</h1>
            <p>{content}</p>
            <Zoom in={isMouseOver}>
                <IconButton
                    onClick={() => onDelete(id)}
                    className="note-button"
                    aria-label="delete"
                >
                    <DeleteOutlinedIcon />
                </IconButton>
            </Zoom>
        </div>
    );
}

Note.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    content: PropTypes.string,
    onDelete: PropTypes.func.isRequired
}

export default Note;