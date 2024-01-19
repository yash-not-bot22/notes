import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";


const Signup = (props) => {
    const [user,setuser]=useState({name:"",email:"",password:"",cpassword:""})
    const handlechange=(e)=>{
        setuser({...user,[e.target.name]:e.target.value})
      }

      let navigate=useNavigate();
      let nav=useNavigate();

    const handleclick=async(e)=>{
        e.preventDefault();
        const response = await fetch(`/api/auth/createuser`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
       
        body: JSON.stringify({"name":user.name,"email":user.email,"password":user.password}), // body data type must match "Content-Type" header
      });

      const auth= await response.json();
      
      
      if(auth.authtoken){
         localStorage.setItem('token',auth.authtoken)
         props.logstatus();
         nav("/");
        
      }
      else{
        console.log(auth)
        
        navigate("/signup");
      }
      
      
      
      
    }
  return (
    <div className='container my-3'>
      <form>
  <div className="mb-3">
  <label htmlFor="name1" className="form-label">Name </label>
    <input type="text" name="name" onChange={handlechange}  className="form-control" id="name1" />
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" name="email"  onChange={handlechange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" name="password" onChange={handlechange}  className="form-control" id="exampleInputPassword1"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputcPassword1" className="form-label"> confirm Password</label>
    <input type="password" name="cpassword" onChange={handlechange}  className="form-control" id="exampleInputcPassword1"/>
  </div>
  
  <button type="submit" onClick={handleclick} className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup
