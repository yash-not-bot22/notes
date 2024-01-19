import React, { useEffect } from 'react'
import Notecontext from './notecontext'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";


function Setnote(props) {
 
  
  const [notes,setnotes]= useState([])
  //add a note
  

  
  //getallnotes
  

  const getnotes=async()=> {
   
    const response = await fetch("/api/notes/fetchallnotes", {
      method: "GET", 
      
      headers: {
        "auth-token": localStorage.getItem('token'),
        "Content-Type": "application/json",
      },
      
      
    });
    const newnotes= await response.json()
    setnotes(newnotes)
     // parses JSON response into native JavaScript objects
  }
  
  
  


  
  const addNote=async(title,description,tag)=>{

    const response = await fetch(`/api/notes/addnote`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token'),
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
       
        body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
      });
      const notee= await response.json();

    const note={
      "title":title,
      "description":description,
      "tag":tag,
      "_id":notee._id
    }
    
    
    setnotes(notes.concat(note))

  }


  //delete a note
  const deletenote=async(id)=>{
    const res=  await fetch(`/api/notes/deletenote/${id}`,{
      method: "DELETE",
      headers:{
        "auth-token": localStorage.getItem('token'),

      }
    }) ;

    const newnotes=notes.filter((note)=>{return id!==note._id})
    setnotes(newnotes)

  }
  //edit a note
  const editnote= async(title,description,tag,id)=>{
    //api call
    
      const response = await fetch(`/api/notes/updatenote/${id}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        
        headers: {
          "auth-token": localStorage.getItem('token'),
           'Content-Type': 'application/json',
        },
       
        body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
      });
      const json =await ( response.json()) // parses JSON response into native JavaScript objects
    
      

    
  
     // setnotes(notes.concat(json))
    
    let newnotes=JSON.parse(JSON.stringify(notes))
    let i;
    for( i=0;i<newnotes.length;i++)
    {
      if(newnotes[i]._id===id)
      {
        newnotes[i].title=title;
        newnotes[i].description=description;
        newnotes[i].tag=tag;
      }
    }
    
    
    setnotes(newnotes);
  }

  return (
    <Notecontext.Provider value={{notes,addNote,deletenote,getnotes,editnote}}>
      {props.children}
    </Notecontext.Provider>
    
  )
}

export default Setnote
