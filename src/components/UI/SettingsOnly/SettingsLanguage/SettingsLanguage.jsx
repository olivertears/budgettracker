import React from 'react'
import RadioLanguage from '../../ReusedElements/RadioLanguage/RadioLanguage'
import cl from './SettingsLanguage.module.css'

const SettingsLanguage = (props) => {
  const defaultValues = ['en', 'ru']
  return (
    <div
      className={cl.langOn}
      style={{
        display: props.checkLang,
        background: props.mode === 'dark' ? '#333' : '#c4c4c4',
      }}
    >
      <div className={cl.langLines}>
        <RadioLanguage
          language={props.language}
          setLanguage={props.setLanguage}
          defaultValue={defaultValues[0]}
          mode={props.mode}
          nickname={props.nickname}
          email={props.email}
          userId={props.userId}
          createdDate={props.createdDate}
          role={props.role}
          confirmed={props.confirmed}
          language={props.language}
          currency={props.currency}
          mode={props.mode}
          token={props.token}
        />
        <h2
          className={cl.langChange}
          style={{
            color: props.mode === 'dark' ? '#f0f8ff' : 'black',
          }}
        >
          English
        </h2>
      </div>
      <div className={cl.langLines}>
        <RadioLanguage
          language={props.language}
          setLanguage={props.setLanguage}
          defaultValue={defaultValues[1]}
          mode={props.mode}
          nickname={props.nickname}
          email={props.email}
          userId={props.userId}
          createdDate={props.createdDate}
          role={props.role}
          confirmed={props.confirmed}
          language={props.language}
          currency={props.currency}
          mode={props.mode}
          token={props.token}
        />
        <h2
          className={cl.langChange}
          style={{
            color: props.mode === 'dark' ? '#f0f8ff' : 'black',
          }}
        >
          Русский
        </h2>
      </div>
    </div>
  )
}

export default SettingsLanguage
