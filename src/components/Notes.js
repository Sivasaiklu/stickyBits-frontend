import React, { useContext, useEffect, useState } from "react";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import noteContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: "" });

  const [modalVisible, setModalVisible] = useState(false);

  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;


  let navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }else{
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);


  const updateNote = (currentNote) => {
    setNote({id:currentNote._id,  etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
    setModalVisible(true);
    props.showAlert("Notes Updated Successfully!", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    console.log("updating note....", note);
    props.showAlert("Notes Updated Successfully!", "success");
}

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      {modalVisible && (
  <div className="modal fade show d-block" tabIndex="-1" role="dialog">
    <div className="modal-dialog">
      <div className="modal-content bg-dark text-white" style={{ borderColor: "#00FF33", borderRadius: '10px', borderWidth: '2px', borderStyle: 'solid' }}> {/* Dark background and white text */}
        <div className="modal-header border-secondary">
          <h5 className="modal-title text-light">Edit Note</h5> {/* Text color matching the theme */}
        </div>
        <div className="modal-body">
          <div className="mb-3">
            <label htmlFor="etitle" className="mb-2 text-light">Title</label>
            <input
              type="text"
              className="form-control bg-secondary text-white border-0"
              id="etitle"
              name="etitle"
              value={note.etitle}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="edescription" className="mb-2 text-light">Description</label>
            <input
              type="text"
              className="form-control bg-secondary text-white border-0"
              id="edescription"
              name="edescription"
              value={note.edescription}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="etag" className="mb-2 text-light">Tag</label>
            <input
              type="text"
              className="form-control bg-secondary text-white border-0"
              id="etag"
              name="etag"
              value={note.etag}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="d-flex justify-content-between modal-footer border-secondary">
          <button type="button" className="btn btn-danger" onClick={() => setModalVisible(false)}>
            Close
          </button>
          <button
            disabled={note.etitle.length < 5 || note.edescription.length < 5}
            type="button"
            className="btn btn-info"
            onClick={() => {
              handleClick();
              setModalVisible(false);
            }}
          >
            Update Note
          </button>
        </div>
      </div>
    </div>
  </div>
)}

      
      <div className="d-flex justify-content-center align-items-center mt-2">
      <div className=" row my-4 bg-dark rounded w-100" style={{ borderColor: "#33CCFF", borderRadius: '10px', borderWidth: '2px', borderStyle: 'solid' }}>
        <h2 className="text-info m-2">Your Notes</h2>
        <div className="container m-2 mb-3 text-danger">
          {notes.length === 0 && "No Notes to Display"}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>
          );
        })}
      </div>
      </div>

      
    </>
  );
};

export default Notes;
