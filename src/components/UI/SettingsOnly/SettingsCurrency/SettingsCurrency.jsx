import React from 'react'
import RadioCurrency from '../../ReusedElements/RadioCurrency/RadioCurrency'
import cl from './SettingsCurrency.module.css'

const SettingsCurrency = (props) => {
  const defaultValues = ['$', '€', '₽', '£']
  return (
    <div
      className={cl.curOn}
      style={{
        display: props.checkCur,
        background: props.mode === 'dark' ? '#333' : '#c4c4c4',
      }}
    >
      <div className={cl.curItem}>
        <RadioCurrency
          currency={props.currency}
          setCurrency={props.setCurrency}
          defaultValue={defaultValues[0]}
          nickname={props.nickname}
          email={props.email}
          userId={props.userId}
          createdDate={props.createdDate}
          role={props.role}
          confirmed={props.confirmed}
          language={props.language}
          token={props.token}
          mode={props.mode}
        />
        <h2
          className={cl.curChange}
          style={{
            color: props.mode === 'dark' ? '#f0f8ff' : 'black',
          }}
        >
          $
        </h2>
      </div>
      <div className={cl.curItem}>
        <RadioCurrency
          currency={props.currency}
          setCurrency={props.setCurrency}
          defaultValue={defaultValues[1]}
          nickname={props.nickname}
          email={props.email}
          userId={props.userId}
          createdDate={props.createdDate}
          role={props.role}
          confirmed={props.confirmed}
          language={props.language}
          token={props.token}
          mode={props.mode}
        />
        <h2
          className={cl.curChange}
          style={{
            color: props.mode === 'dark' ? '#f0f8ff' : 'black',
          }}
        >
          €
        </h2>
      </div>
      <div className={cl.curItem}>
        <RadioCurrency
          currency={props.currency}
          setCurrency={props.setCurrency}
          defaultValue={defaultValues[2]}
          nickname={props.nickname}
          email={props.email}
          userId={props.userId}
          createdDate={props.createdDate}
          role={props.role}
          confirmed={props.confirmed}
          language={props.language}
          token={props.token}
          mode={props.mode}
        />
        <h2
          className={cl.curChange}
          style={{
            color: props.mode === 'dark' ? '#f0f8ff' : 'black',
          }}
        >
          ₽
        </h2>
      </div>
      <div className={cl.curItem}>
        <RadioCurrency
          currency={props.currency}
          setCurrency={props.setCurrency}
          defaultValue={defaultValues[3]}
          nickname={props.nickname}
          email={props.email}
          userId={props.userId}
          createdDate={props.createdDate}
          role={props.role}
          confirmed={props.confirmed}
          language={props.language}
          token={props.token}
          mode={props.mode}
        />
        <h2
          className={cl.curChange}
          style={{
            color: props.mode === 'dark' ? '#f0f8ff' : 'black',
          }}
        >
          £
        </h2>
      </div>
    </div>
  )
}

export default SettingsCurrency
