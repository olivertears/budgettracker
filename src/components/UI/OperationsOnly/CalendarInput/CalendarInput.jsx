import React from 'react'
import cl from './CalendarInput.module.css'

const CalendarInput = (props) => {
  return (
    <div className={cl.wrap}>
      <div className={cl.left}>
        <input
          value={props.dateStart}
          onChange={(start) => props.changeDate(start, props.dateEnd)}
          type="date"
          className={cl.left}
        ></input>
      </div>
      <h2 className={cl.betweenInput}>-</h2>
      <div className={cl.right}>
        <input
          value={props.dateEnd}
          onChange={(end) => props.changeDate(props.dateStart, end)}
          type="date"
          className={cl.right}
        ></input>
      </div>
    </div>
  )
}

export default CalendarInput
