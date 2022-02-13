import React from 'react'
import LoginWindow from '../UI/LoginOnly/LoginWindow/LoginWindow'

const Login = (props) => {
  return (
    <div
      className="Login"
      style={{ background: props.mode === 'dark' ? '#333' : '#c4c4c4' }}
    >
      <LoginWindow mode={props.mode} setIsAuth={props.setIsAuth} />
    </div>
  )
}

export default Login
