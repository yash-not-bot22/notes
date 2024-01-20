import React, { useState } from 'react'
import Setnote from '../context/setnote'
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [user,setuser]=useState({name:"",email:"",password:""})
    const loginuser=(e)=>{
        setuser({...user,[e.target.name]:e.target.value})
      }

      const handleclick=async(e)=>{
        
        e.preventDefault();
       await loginuserapi(user);
        props.logstatus();
        
      }
      let navigate=useNavigate();
      

      const loginuserapi=async(userdet)=>{
        const response = await fetch(`https://notes-edsy59zno-yash-baghelas-projects.vercel.app/api/auth/login`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': 'https://notes-8dn83taj8-yash-baghelas-projects.vercel.app',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
       
        body: JSON.stringify(userdet), // body data type must match "Content-Type" header
      });
      

      let auth= await response.json();
      if(auth){
        if(auth.authtoken){
          localStorage.setItem('token',auth.authtoken)
          navigate("/");
        }
        else{
          console.log(auth.error);
          navigate('/login');
        }
      }
      else{
        navigate("/login");
        
      }
     
      
      
      
      
      

      }
      






  return (
    <div className='container my-3'>
      <form>
  <div className="mb-3">
    <label htmlFor="exampleInputname1" className="form-label">name</label>
    <input type="text" onChange={loginuser} className="form-control" id="exampleInputname1" name="name" />
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" onChange={loginuser} className="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" onChange={loginuser} name="password" className="form-control" id="exampleInputPassword1"/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" onClick={handleclick} className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Login;
