import React, {useContext} from 'react'
import { AuthContext } from '../context/AuthContext';

import { useParams } from 'react-router-dom';
import toggleClass from '../helpers/toggleClass';

export default function EditColumnBtn(props) {
  const {boardId} = useParams()
  const auth = useContext(AuthContext)

  function editColumnHandler(e) {
    const wrapper = e.target.closest('.change-column-wrapper')
    const div = wrapper.querySelector('.input-wrapper')
    const btns = wrapper.querySelector('.change-column-btn') 
    const input = document.createElement('input')
    input.setAttribute('value', div.innerText)
    input.setAttribute('class', 'p-0 change-column')
    toggleClass(btns)
    div.innerHTML = ''
    div.append(input)
  }

  async function saveColumnHandler(e, setColumns) {
    const wrapper = e.target.closest('.change-column-wrapper')
    const div = wrapper.querySelector('.input-wrapper')
    const btns = wrapper.querySelector('.change-column-btn') 
    const input = wrapper.querySelector('.change-column')
    const columnId = div.dataset.columnid
    const response = await fetch(`/boards/${boardId}/columns/${columnId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({title: input.value})
    })
    let requestForColumns
    if(response.ok) {
      div.innerHTML = `<h2>${input.value}</h2>`
      requestForColumns  = await fetch(`/users/${auth.userId}/boards/${boardId}`)
      toggleClass(btns)
    } if(requestForColumns.ok) {
      let data = await requestForColumns.json()
      setColumns(data)
    }
  }

  async function deleteColumnHandler(e, setColumns) {
    const wrapper = e.target.closest('.change-column-wrapper')
    const div = wrapper.querySelector('.input-wrapper')
    const columnId = div.dataset.columnid
    const response = await fetch(`/boards/${boardId}/columns/${columnId}`, {
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
      <div className="change-column-wrapper w-100 d-flex justify-content-between px-2">
        <div className="input-wrapper" data-columnid={props.columnId}>
          <h2 className="title-wrapper">{props.columnTitle}</h2>
        </div>
        <div className="change-column-btn">
          <button onClick={editColumnHandler} className="edit-btn btn p-1 show"><i className="fas fa-edit"></i></button>
          <button onClick={(e) => deleteColumnHandler(e, props.setColumns)}className="delete-btn btn p-1 show"><i className="far fa-trash-alt"></i></button>
          <button onClick={(e) => saveColumnHandler(e, props.setColumns)} className="save-btn btn p-1 hidden"><i className="fas fa-check"></i></button>
        </div>
    </div>
  )
}