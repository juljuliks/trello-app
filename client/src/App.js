import '@atlaskit/css-reset'
import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import useRoutes from './routes';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';
import Navbar from './components/Navbar';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('theme') === 'dark') {
      setDarkMode(true)
    }
  }, [])

  const {token, login, logout, userId} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
  return (
      <AuthContext.Provider value={{token, login, logout, userId, isAuthenticated}}>
          <Router>
            <div className={darkMode ? "dark-mode" : "light-mode"}>
              {isAuthenticated && <Navbar darkMode={darkMode} setDarkMode={setDarkMode}/>}
              {routes}
            </div>
          </Router>
      </AuthContext.Provider>
  )
} 

export default App