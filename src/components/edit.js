import React, { useContext } from 'react'
import Notecontext from '../context/notecontext'

const Edit = () => {

    const {}=useContext(Notecontext)
  return (
    <div>
        <div className="form-floating mb-3">
  <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com"/>
  <label htmlFor="floatingInput">Title</label>
</div>
<div className="form-floating">
  <input type="text" className="form-control" id="floatingPassword" placeholder="Password"/>
  <label htmlFor="floatingPassword">description</label>
</div>
      
    </div>
  )
}

export default Edit

