import React, {useContext} from 'react'

import { AuthContext } from './context/AuthContext';


export default function CreateBoard() {
  const auth = useContext(AuthContext)

  async function createBoardHandler(e) {
    e.preventDefault()
    console.log(e.target.title.value);
    const response = await fetch(`/users/${auth.userId}/boards`, {
      method: 'POST',
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({title: e.target.title.value})
    })
    if(response.ok) {
      window.location.assign('/')
    }
  }

  return (
    <div className="container my-5" style={{"width": "30rem"}}>
      <form onSubmit={createBoardHandler}>
        <div className="mb-3">
          <label className="form-label">Board title</label>
          <input type="text" name="title" className="form-control" autoComplete="off"/>
          <div id="emailHelp" className="form-text">Enter the name your board will be displayed with</div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}