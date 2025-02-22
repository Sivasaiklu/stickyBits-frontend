import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Notes Added Successfully!", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="card bg-dark text-info shadow-lg p-4 w-100" style={{ borderColor: "#00FF33", borderRadius: '10px', borderWidth: '2px', borderStyle: 'solid' }}>
        <div className="card-body">
          <h2 className="text-center mb-4">Add a Note</h2>
          <form className="my-3">
            <div className="mb-3">
              <label htmlFor="title" className="mb-2 text-light">
                Title
              </label>
              <input type="text" className="form-control bg-secondary text-light border-info" id="title" name="title" placeholder="Enter title" value={note.title} onChange={onChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="mb-2  text-light">
                Description
              </label>
              <textarea className="form-control bg-secondary text-light border-info" id="description" name="description" placeholder="Add description" value={note.description} onChange={onChange} required rows="3"></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="mb-2  text-light">
                Tag
              </label>
              <input type="text" className="form-control bg-secondary text-light border-info" id="tag" name="tag" placeholder="Add tag" value={note.tag} onChange={onChange} />
            </div>
            <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-info w-auto mx-2" onClick={handleClick}>
              Add Note
            </button>
            <button disabled={note.title.length < 5 || note.description.length < 5} type="button" className="btn btn-info w-auto mx-2" onClick={() => setNote({ title: "", description: "", tag: "" })}>Clear</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNote;
