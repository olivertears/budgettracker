import React from 'react'
import CloseButton from '../../ReusedElements/CloseButton/CloseButton'
import cl from './NotConfirmed.module.css'
import { useTranslation } from 'react-i18next'

const NotConfirmed = (props) => {
  const { t } = useTranslation()

  return (
    <div
      className={cl.full}
      style={{
        display: props.isWarning,
      }}
    >
      <div className={cl.wrap}>
        <div className={cl.header}>
          <h1 className={cl.headerTxt}>{t('error')}</h1>
          <div
            className={cl.closeButton}
            onClick={() => props.setIsWarning('none')}
          >
            <CloseButton />
          </div>
        </div>
        <div
          className={cl.content}
          style={{ background: props.mode === 'dark' ? '#333' : '#c4c4c4' }}
        >
          <h3
            className={cl.mistakeBody}
            style={{ color: props.mode === 'dark' ? '#f0f8ff' : 'black' }}
          >
            {t('confirm_ur_acc')}
          </h3>
          <button
            className={cl.okbutton}
            onClick={() => props.setIsWarning('none')}
          >
            <h1>{t('ok')}</h1>
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotConfirmed
