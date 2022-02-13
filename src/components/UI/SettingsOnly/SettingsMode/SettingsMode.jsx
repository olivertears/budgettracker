import React from 'react'
import RadioMode from '../../ReusedElements/RadioMode/RadioMode'
import cl from './SettingsMode.module.css'
import { useTranslation } from 'react-i18next'

const SettingsMode = (props) => {
  const { t } = useTranslation()

  const defaultValues = ['light', 'dark']
  return (
    <div
      className={cl.modeOn}
      style={{
        display: props.checkMode,
        background: props.mode === 'dark' ? '#333' : '#c4c4c4',
      }}
    >
      <div className={cl.modeItem}>
        <RadioMode
          mode={props.mode}
          setMode={props.setMode}
          defaultValue={defaultValues[0]}
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
          className={cl.modeChange}
          style={{
            color: props.mode === 'dark' ? '#f0f8ff' : 'black',
          }}
        >
          {t('light')}
        </h2>
      </div>
      <div className={cl.modeItem}>
        <RadioMode
          mode={props.mode}
          setMode={props.setMode}
          defaultValue={defaultValues[1]}
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
          className={cl.modeChange}
          style={{
            color: props.mode === 'dark' ? '#f0f8ff' : 'black',
          }}
        >
          {t('dark')}
        </h2>
      </div>
    </div>
  )
}

export default SettingsMode
