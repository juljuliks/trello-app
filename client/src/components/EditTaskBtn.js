import React, {useContext} from 'react'
import { AuthContext } from '../context/AuthContext';

import { useParams } from 'react-router-dom';
import toggleClass from '../helpers/toggleClass';

export default function EditTaskBtn(props) {
  const auth = useContext(AuthContext)

  const {boardId} = useParams()

  function editTaskHandler(e) {
    const wrapper = e.target.closest('.change-task-wrapper')
    const div = wrapper.querySelector('.input-wrapper')
    const btns = wrapper.querySelector('.change-task-btn') 
    const input = document.createElement('input')
    input.setAttribute('value', div.innerText)
    input.setAttribute('class', 'change-task')
    toggleClass(btns)
    div.innerHTML = ''
    div.append(input)
  }

  async function saveTaskHandler(e, setColumns) {
    const wrapper = e.target.closest('.change-task-wrapper')
    const div = wrapper.querySelector('.input-wrapper')
    const btns = wrapper.querySelector('.change-task-btn') 
    const input = wrapper.querySelector('.change-task')
    const columnId = div.dataset.columnid
    const taskId = div.dataset.taskid
    const response = await fetch(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({body: input.value})
    })
    let requestForColumns
    if(response.ok) {
      requestForColumns  = await fetch(`/users/${auth.userId}/boards/${boardId}`)
      toggleClass(btns)
    } if(requestForColumns.ok) {
      let data = await requestForColumns.json()
      setColumns(data)
    }
  }

  async function deleteTaskHandler(e, setColumns) {
    const wrapper = e.target.closest('.change-task-wrapper')
    const div = wrapper.querySelector('.input-wrapper')
    const columnId = div.dataset.columnid
    const taskId = div.dataset.taskid
    const response = await fetch(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, {
      method: 'DELETE',
    })
    let requestForColumns
    if(response.ok) {
      requestForColumns  = await fetch(`/users/${auth.userId}/boards/${boardId}`)
    } if(requestForColumns.ok) {
      let data = await requestForColumns.json()
      setColumns(data)
    }
  }
  return (
      <div className="change-task-wrapper d-flex justify-content-between align-items-center">
        <div className="input-wrapper w-100" data-columnid={props.columnId} data-taskid={props.taskId}>{props.taskBody}</div>
        <div className="change-task-btn d-flex">
          <button onClick={editTaskHandler} className="edit-btn btn p-1 show"><i className="fas fa-edit"></i></button>
          <button onClick={(e) =>deleteTaskHandler(e, props.setColumns)} className="delete-btn btn p-1 show"><i className="far fa-trash-alt"></i></button>
          <button onClick={(e) => saveTaskHandler(e, props.setColumns)} className="save-btn btn p-1 hidden"><i className="fas fa-check"></i></button>
        </div>
      </div>
  )
}