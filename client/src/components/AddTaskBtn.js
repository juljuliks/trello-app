import React, {useContext} from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function AddTaskBtn(props) {
  const {boardId} = useParams()
  const auth = useContext(AuthContext)

  async function addTaskHandler(e) {
    e.preventDefault()
    const {action} = e.target
    let response = await fetch(action, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({body: e.target.body.value})
    })
    let responseForColumns
    if(response.ok) {
      responseForColumns = await fetch(`/users/${auth.userId}/boards/${boardId}`) 
    }
    let allColumns = await responseForColumns.json()
    if(responseForColumns.ok) {
      e.target.body.value = ''
      props.setColumns(allColumns)
    }
  }

  return (
      <div className="dropdown w-100">
        <button className="w-100 p-1 btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          Add Task
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
            <form action={`/boards/${boardId}/columns/${props.columnId}`} onSubmit={addTaskHandler}>
              <div className="mb-3 d-flex flex-column p-1">
                <input type="text" name="body" className="form-control" autoComplete="off"/>
                <button className="btn btn-secondary mt-2">Save</button>
              </div>
            </form>
          </li>
        </ul>
      </div>
  )
}