import React from 'react'
import { useContext,useState } from 'react'
import Notecontext from '../context/notecontext'
import Cards from './cards'
import {useNavigate} from 'react-router-dom'


function Home(props) {

  const context = useContext(Notecontext);
  const {addNote} = context;
  let nav=useNavigate();

  const logout=()=>{
    localStorage.setItem('token',"");
    props.logstatus();
        nav("/login");
  }


  const [note,setnote]=useState({title:"",description:"",tag:""})
  const addnote=(e)=>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
    setnote({title:"",description:"",tag:""})
  }

  const makingnote=(e)=>{
    setnote({...note,[e.target.name]:e.target.value})
  }

  
  
  return (
    <>
    <div className={`container my-5 rounded bg-${props.theme} text-${props.theme==='light'?'dark':'light'}`}>
      <form>
  <div className="mb-3 dark">
    <label htmlFor="title" className="form-label">Title of note</label>
    <input type="text" name="title" className="form-control" onChange={makingnote} id="title" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">description</label>
    <input type="text" name="description" className="form-control" onChange={makingnote} id="description"/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary" onClick={addnote}>Submit</button>
</form>
<button className='my-2' onClick={logout} >Log Out</button>


    </div>



    <Cards theme={props.theme}/>
</>
  )
}

export default Home
