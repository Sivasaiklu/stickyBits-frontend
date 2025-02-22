import React from 'react';

export default function About() {
  return (
    <div className="container mt-5">
      <div className="card  p-4 bg-dark" style={{ borderColor: "#00FF33", borderRadius: '10px', borderWidth: '2px', borderStyle: 'solid' }}>
        <h1 className="text-center mb-4 text-info">About StickyBits</h1>
        <p className="lead text-center text-light">
          Welcome to Notes App, your personal space to create, update, and manage your notes with ease.
        </p>
        <hr />
        <h4 className='text-light'>Features:</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item text-info bg-dark">🔹 Secure Login & Signup</li>
          <li className="list-group-item text-info bg-dark">🔹 Create and Save Notes</li>
          <li className="list-group-item text-info bg-dark">🔹 Edit and Update Notes</li>
          <li className="list-group-item text-info bg-dark">🔹 Delete Unwanted Notes</li>
          <li className="list-group-item text-info bg-dark">🔹 Access Your Notes Anytime, Anywhere</li>
        </ul>
        <div className="text-center mt-4">
          <p className="text-light" >Start organizing your thoughts today with StickyBits!</p>
        </div>
      </div>
    </div>
  );
}
