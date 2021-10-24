import React, { useState, useContext } from "react";
import { useHttp } from "./hooks/http.hook";
import {AuthContext} from './context/AuthContext'

function AuthPage() {
  const auth = useContext(AuthContext)
  const {loading, request} = useHttp()
  const [form, setForm] = useState(
    {email: '', password: ''}
  )

  const changeHandler = (e) => {
    setForm({...form, [e.target.name]: e.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/users/register', 'POST', {...form})
      auth.login(data.token, data.userId)
    } catch(e) {}
  }

    const loginHandler = async () => {
    try {
      const data = await request('/users/login', 'POST', {...form})
      auth.login(data.token, data.userId)
    } catch(e) {}
  }

  return (
    <div className="container d-flex justify-content-center" style={{height: 500}}>
      <div className="d-flex justify-content-center align-items-center">
        <div className="card" style={{width: 500}}>
          <div className="card-body">
            <form>
            <h5 className="card-title mb-3">log in</h5>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1" style={{width: 100}}>Login</span>
              <input name="email" required type="email" className="form-control" autoComplete="off"
              onChange={changeHandler}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1" style={{width: 100}}>Password</span>
              <input type="password" required name="password"  className="form-control" autoComplete="off"
              onChange={changeHandler}
              />
            </div>
            <div>
              <button className="mr-3 btn btn-secondary"
              type="submit"
              onClick={registerHandler}
              disabled={loading}
              >
                Register</button>
              <button className="mx-3 btn btn-secondary"
              type="submit"
              onClick={loginHandler}
              disabled={loading}
              >Login</button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage