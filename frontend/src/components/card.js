import React, { useState } from 'react'
import { useContext } from 'react'
import Notecontext from '../context/notecontext'
import {Link} from "react-router-dom"

function Card(props) {
  const {notes,addnote,deletenote}=useContext(Notecontext)
  const {note,editnote}=props;
  
    
  return (
<>
    <div className={`col-md-3 card mx-3 my-3 bg-${props.theme} text-${props.theme==='light'?'dark':'light'}   `}>
     
  <div className="card-body">
    <h5 className="card-title">{props.title}</h5>
    <h6 className="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
    <p className="card-text">{props.description}</p>
    <div className=' flex '>
    <i  onClick={()=>{editnote(note)}} className={`fa-solid fa-pen-to-square text-${props.theme==='light'?'dark':'light'}  `} > </i>
    
    <i className={`fa-solid fa-trash mx-2 text-${props.theme==='light'?'dark':'light'} `} onClick={()=>{deletenote(props.id)}}></i>
    </div>
  
  </div>


    </div>


   
    </>
  )
}




export default Card
