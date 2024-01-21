import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar(props) {
  return (
    <div>
      <nav className={`navbar navbar-expand-lg navbar-${props.theme} bg-${props.theme}`}>
  <div className="container-fluid">
    <Link className={`navbar-brand ` } to="/">{props.title}</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/">about</Link>
        </li>
        
       
      </ul>
      <div className={`form-check form-switch text-${props.theme==='light'?'dark':'light'}`}>
      
  <input className="form-check-input" onClick={props.toggle} type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
  <label  className="form-check-label" htmlFor="flexSwitchCheckDefault">{`${props.theme} mode`}</label>
  <Link className="btn btn-primary mx-2" to="/login" onClick={props.logstatus} hidden={props.log} role="button">login</Link>
  <Link className="btn btn-primary" to="/signup" onClick={props.logstatus} hidden={props.log} role="button">signup</Link>

</div>
    </div>
  </div>
</nav>
    </div>
  )
}
