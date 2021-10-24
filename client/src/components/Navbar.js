import React, {useContext, useState, useEffect} from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

export default function Navbar(props) {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const [boards, setBoards] = useState([])

  function logoutHandler(e) {
    e.preventDefault()
    auth.logout()
    history.push('/')
  }

  useEffect(() => {
    if(auth.userId) {
      fetch(`/users/${auth.userId}/boards`).then(
        res => res.json()
      ).then(setBoards)
    }
  }, [auth.userId])

  function themeToggleHanlder(setMode, mode) {
    if(localStorage.getItem('theme')) {
      localStorage.setItem('theme', '')
      setMode(!mode)
      return 
    }
    localStorage.setItem('theme', 'dark')
    setMode(!mode)
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <NavLink className="nav-link" to='/boards'>Task runner</NavLink>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to='/create-board'>Create new board</NavLink>
            </li>
            <li className="nav-item dropdown">
              <p className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Boards
              </p>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {boards.map(el => (
                  <li key={el.id} id={el.id}>
                    <NavLink className="nav-link" to={`/boards/${el.id}`}>
                    {el.title}</NavLink>
                  </li>
                  ))}
              </ul>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <a className="nav-link link-secondary" href="/" onClick={logoutHandler}>Logout</a>
            <div className="form-check form-switch">
              <label id="switch" class="switch">
                <input type="checkbox" onchange="toggleTheme()" id="slider" onChange={() => themeToggleHanlder(props.setDarkMode, props.darkMode)}/>
                  <span class="slider round"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}