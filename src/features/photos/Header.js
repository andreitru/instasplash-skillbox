import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logIn, logOut } from '../../api/tokenSlice'

export const Header = () => {
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector(state => state.token)
  let loginButton
  if (isLoggedIn) {
    loginButton = 'Log Out'
  } else {
    loginButton = 'Log In'
  }
  return (
    <header className="header">
        <div className="logo">
          <p>INSTASPLASH</p>
        </div>

        <div className="login-block">
          <p 
            className="login-text">
            {isLoggedIn ? "You are logged in" : ""}
          </p>
          <button 
            className="login-button" 
            onClick={() => {isLoggedIn ? dispatch(logOut()) : dispatch(logIn())}}>
              {loginButton}
          </button>
        </div>
      </header>
  )
}