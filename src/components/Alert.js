import React from 'react'

export default function Alert(props) {

    const capitalize = (word) => {
      if(word === "danger"){
        word = "error"
      }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);

    }
  return (
    <div style={{height: '50px'}}>
        {props.alert && <div style={{width:'fit-content', justifySelf:'center'}} className={`alert alert-${props.alert.type} alert-dismissible fade show h-100 d-flex m-3 p-auto`} role="alert">
            <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
        </div>}
    </div>
  )
}
