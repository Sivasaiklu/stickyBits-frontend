import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext';


const NoteItem = (props) => {

    const context = useContext(noteContext);
    const { deleteNote } = context;
    const {note, updateNote} = props;

  return (
    <div className='col-md-3'>      
      <div className="card my-3 bg-dark" style={{ borderColor: "#00FF33", borderRadius: '10px', borderWidth: '2px', borderStyle: 'solid' }}>
        <div className="card-body">
            <div className="d-flex align-items-center">
                <h5 className="card-title text-light">{note.title}</h5> 
                <i className="fa-solid fa-trash mx-2 text-danger" onClick={ () => {deleteNote(note._id); props.showAlert("Notes Deleted Successfully!", "success");}}></i>
                <i className="fa-solid fa-pen-to-square mx-2 text-info" onClick={ () => {updateNote(note)}}></i>
            </div>
            <p className="card-text" style={{color: 'lightblue'}}>{note.description}</p>
            
        </div>
       </div>
    </div>
  )
}

export default NoteItem
