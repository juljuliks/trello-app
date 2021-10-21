import React, {useContext, useState, useEffect} from 'react'
import { AuthContext } from './context/AuthContext';
import { NavLink } from 'react-router-dom'

export default function Boards() {
  const auth = useContext(AuthContext)
  const [boards, setBoards] = useState([])
  useEffect(() => {
    if(auth.userId) {
    fetch(`/users/${auth.userId}/boards`).then(
      res => res.json()
    ).then(setBoards)
    }
  }, [auth.userId])

  async function deleteBoardHandler(e) {
    e.preventDefault()
    const {action} = e.target
    const response = await fetch(action, {
      method: 'DELETE'
    })
    let getAllBoardsResponse;
    if(response.ok) {
      getAllBoardsResponse = await fetch(`/users/${auth.userId}/boards`)
    }
    if(getAllBoardsResponse.ok) {
      let data = await getAllBoardsResponse.json()
      setBoards(data)
      document.querySelector('.modal-backdrop').classList.remove('show')
    }
  }
  
  if(boards.length) {
    return(
      <div className="container m-5 d-flex justify-content-center">
        <div className="d-flex justify-content-center flex-column">
          {boards.map(el => (
            <div key={el.id}>
              <div data-board-id={el.id} className="card m-3" style={{"width": "30rem", height: 100}}>
                <div className="card-body d-flex justify-content-between align-items-center">
                  <h5 className="card-title">{el.title}</h5>
                  <div className="board-btn">
                    <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                      <i className="far fa-trash-alt"></i>
                    </button>
                    <NavLink className="btn" to={`boards/${el.id}`}><i className="fas fa-arrow-right"></i></NavLink>
                  </div>
                </div>
              </div>
              <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title text-center" id="exampleModalLabel">Delete this board?</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <form action={`/boards/${el.id}`} onSubmit={deleteBoardHandler}>
                        <button className="btn btn-secondary">Delete</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  } else {
    return (
       <div className="container d-flex justify-content-center text-center">
         <div className="m-5 d-flex justify-content-center flex-column" style={{"width": "20rem"}}>
           <h3>You don't have any boards yet</h3>
          <button className="btn btn-secondary my-3">
              <NavLink className="nav-link link-light" to='/create-board'>Create new board</NavLink>
          </button>
         </div>
       </div>
    )
  }


}