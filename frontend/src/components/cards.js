import React, { useEffect, useRef,useState } from 'react'
import Card from './card'
import { useContext } from 'react'
import Notecontext from '../context/notecontext'
import { useNavigate } from 'react-router-dom'

function Cards(props) {
    
    const {notes,addnote,getnotes,editnote}=useContext(Notecontext)
    let navigate=useNavigate();

    useEffect(()=>{
      if(localStorage.getItem('token'))
      {
        
        getnotes();
      }
      
  
      else
      navigate('/login');
  
    },[])
    const [note,setnote]=useState({etitle:"",edescription:"",etag:"",id:""})

    const ref2=useRef(null)
    const ref = useRef(null)
    const editnotee=(notee)=>{
        setnote({etitle:notee.title,edescription:notee.description,etag:notee.tag,id:notee._id})
        ref.current.click()
    }

    const makingnote=(e)=>{
      setnote({...note,[e.target.name]:e.target.value})
    }

    const addnotee=(e)=>{
      ref2.current.click()
      e.preventDefault();
      editnote(note.etitle,note.edescription,note.etag,note.id);
    }
    
    

  return (
    <>
    





    <div className='container '>
    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

    <div className="modal" id="exampleModal" tabIndex="-1">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-etitle">edit note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
  <div className="mb-3 dark">
    <label htmlFor="etitle" className="form-label">title of note</label>
    <input type="text" name="etitle" className="form-control" value={note.etitle} onChange={makingnote} id="etitle" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="edescription" className="form-label">description</label>
    <input type="text" name="edescription" value={note.edescription} className="form-control" onChange={makingnote} id="edescription"/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <div className="modal-footer">
        <button type="button" ref={ref2} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" onClick={addnotee}  className="btn btn-primary">Save changes</button>
      </div>
</form>

      </div>
      
    </div>
  </div>
</div>
        <div className='row justify-content-center' >
        {notes.map((i)=>{
            return(
                
            <Card theme={props.theme} key={i._id} note={i} editnote={editnotee} title={i.title} id={i._id} description={i.description} tag={i.title}/>
            
            )
        })}
        </div>
        
      
    </div>
    </>
  )
}

export default Cards
