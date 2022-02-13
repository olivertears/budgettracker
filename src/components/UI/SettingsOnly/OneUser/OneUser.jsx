import React from 'react'
import cl from './OneUser.module.css'
import adminImg from './Avatar/Admin.png'
import userImg from './Avatar/User.png'
import { useTranslation } from 'react-i18next'

const OneUser = (props) => {
  const { t } = useTranslation()

  return (
    <div
      className={cl.wrap}
      style={{
        outline: props.userId === props.user.id ? '3px solid #ffcc00' : 'none',
      }}
    >
      <div
        className={cl.avatar}
        style={{
          backgroundImage:
            props.user.role === 'USER' ? `url(${userImg})` : `url(${adminImg})`,
        }}
      ></div>
      <div className={cl.wrapForTextData}>
        <h1 className={cl.nick}>
          {props.idx + 1}. {props.user.nickname}
        </h1>
        <h1>
          {t('role')} {props.user.role === 'USER' ? t('user') : t('admin')}
        </h1>
        <h1>{props.user.createdDate}</h1>
      </div>
    </div>
  )
}

export default OneUser
