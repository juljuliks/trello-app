import React, {useContext} from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function AddColumnBtn(props) {
  const {boardId} = useParams()
  const auth = useContext(AuthContext)

  async function addColumnHandler(e) {
    e.preventDefault()
    const response = await fetch(`/boards/${boardId}/columns`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({title: e.target.title.value})
    }) 
    let responseForColumns
    if(response.ok) {
      responseForColumns = await fetch(`/users/${auth.userId}/boards/${boardId}`) 
    }
    let allColumns = await responseForColumns.json()
    if(responseForColumns.ok) {
      e.target.title.value = ''
      props.setColumns(allColumns)
    }
  }

  return (
      <div className="dropdown" style={{marginTop: 42}}>
        <button className="btn py-1 btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
          Add Column
        </button>
        <ul className="dropdown-menu p-0" aria-labelledby="dropdownMenu2">
          <li>
            <form onSubmit={addColumnHandler}>
              <div className="mb-3 d-flex flex-column p-1" style={{width: 380}}>
                <input type="text" name="title" className="form-control" autoComplete="off"/>
                <button className="btn btn-secondary mt-2">Save</button>
              </div>
            </form>
          </li>
        </ul>
      </div>
  )
}