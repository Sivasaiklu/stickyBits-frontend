import React from 'react';

export default function Alert(props) {
  const capitalize = (word) => {
    if (word === "danger") {
      word = "error";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  return (
    <div className='d-flex align-items-center justify-content-center m-2' style={{ height: '50px' }}>
      {props.alert && (
        <div
          style={{
            width: '90%', // Adjust width for mobile screens
            maxWidth: '400px', // Optional: Limit max width
            wordBreak: 'break-word', // Ensure long words wrap
            whiteSpace: 'normal', // Ensure text wraps properly
            overflowWrap: 'break-word', // Break words correctly
          }}
          className={`alert alert-${props.alert.type} alert-dismissible fade show h-100 d-flex flex-wrap m-3 p-2`} // Added `flex-wrap` for responsiveness
          role="alert"
        >
          <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
        </div>
      )}
    </div>
  );
}
