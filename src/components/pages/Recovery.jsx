import React from 'react'
import RecoveryWindow from '../UI/LoginOnly/RecoveryWindow/RecoveryWindow'

const Recovery = (props) => {
  return (
    <div
      className="Login"
      style={{ background: props.mode === 'dark' ? '#333' : '#c4c4c4' }}
    >
      <RecoveryWindow mode={props.mode} />
    </div>
  )
}

export default Recovery
