import React from "react"
import {Switch, Route, Redirect} from 'react-router-dom'
import Board from "./Board"
import Boards from "./Boards"
import AuthPage from "./AuthPage"
import CreateBoard from "./CreateBoard"
function useRoutes(isAuthenticated) {
  if(isAuthenticated) {
    const defaultBoard = localStorage.getItem('boardId')
    return (
      <Switch>
        <Route path="/boards" exact component={Boards}/>
        <Route path={"/boards/:boardId"} component={Board} />
        <Route path={"/create-board"} component={CreateBoard} />
        <Redirect to={defaultBoard ? `/boards/${defaultBoard}` : '/boards'} />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path='/' exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}

export default useRoutes