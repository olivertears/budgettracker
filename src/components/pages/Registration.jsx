import React from 'react'
import RegistrationWindow from '../UI/RegistrationOnly/RegistrationWindow'

const Registration = (props) => {
  return (
    <div
      className="Login"
      style={{ background: props.mode === 'dark' ? '#333' : '#c4c4c4' }}
    >
      <RegistrationWindow
        allUsers={props.allUsers}
        changeAllUsers={props.changeAllUsers}
        mode={props.mode}
      />
    </div>
  )
}

export default Registration
