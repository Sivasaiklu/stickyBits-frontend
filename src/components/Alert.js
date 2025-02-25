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
    <div 
      style={{ 
        height: '100vh', // Full viewport height
        display: 'flex',
        justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
      }}
    >
      {props.alert && (
        <div
          style={{
            width: '90%', 
            maxWidth: '400px',
            wordBreak: 'break-word',
            whiteSpace: 'normal',
            overflowWrap: 'break-word',
          }}
          className={`alert alert-${props.alert.type} alert-dismissible fade show text-center p-3`} 
          role="alert"
        >
          <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
        </div>
      )}
    </div>
  );
}
