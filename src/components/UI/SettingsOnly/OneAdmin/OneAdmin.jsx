import React, { useState } from 'react'
import cl from './OneAdmin.module.css'
import adminImg from './Avatar/Admin.png'
import userImg from './Avatar/User.png'
import catImg from './Travel/categories.png'
import repImg from './Travel/report.png'
import oppImg from './Travel/operations.png'
import uppImg from './Travel/UpBtn.png'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const OneAdmin = (props) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const API = axios.create({
    baseURL: `https://budgettrackerjsonholder.herokuapp.com/`,
  })
  const headers = {
    'Content-Type': 'application/json',
    Authorization: props.token,
  }
  const [fakeRole, setFakeRole] = useState('')

  const changeRole = () => {
    document.getElementsByName('changeRole')[props.idx].display = 'none'

    setFakeRole('ADMIN')

    const changeData = {
      id: props.user.id,
      nickname: props.user.nickname,
      email: props.user.email,
      createdDate: props.user.createdDate,
      role: 'ADMIN',
      confirmed: props.user.confirmed,
      language: props.user.language,
      currency: props.user.currency,
      mode: props.user.mode,
    }

    API.put('api/users', JSON.stringify(changeData), {
      headers,
    })
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const travel = async (place) => {
    const userCategories = await API.get(
      `api/users/${props.user.id}/categories`
    )
    const userOperations = await API.get(
      `api/users/${props.user.id}/operations`
    )

    localStorage.setItem(
      'travelCategories',
      JSON.stringify(userCategories.data)
    )
    localStorage.setItem(
      'travelOperations',
      JSON.stringify(userOperations.data)
    )
    localStorage.setItem('isTravel', JSON.stringify(true))
    localStorage.setItem('lastVisited', JSON.stringify(place))
    props.setIsTravel(true)
    navigate(place)
  }

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
      <div className={cl.wrapForData}>
        <h1 className={cl.nickname}>
          {props.idx + 1}. {props.user.nickname}
        </h1>
        <h1>
          {t('role')}{' '}
          {fakeRole
            ? t('admin')
            : props.user.role === 'USER'
            ? t('user')
            : t('admin')}
        </h1>
        <h1>{props.user.createdDate}</h1>
        <div className={cl.wrapForTravel}>
          <div
            className={cl.travelOrUp}
            style={{
              backgroundImage: `url(${oppImg})`,
              display: props.userId === props.user.id ? 'none' : '',
            }}
            onClick={() => {
              travel('/operations')
            }}
          ></div>
          <div
            className={cl.travelOrUp}
            style={{
              backgroundImage: `url(${repImg})`,
              display: props.userId === props.user.id ? 'none' : '',
            }}
            onClick={() => {
              travel('/report')
            }}
          ></div>
          <div
            className={cl.travelOrUp}
            style={{
              backgroundImage: `url(${catImg})`,
              display: props.userId === props.user.id ? 'none' : '',
            }}
            onClick={() => {
              travel('/categories')
            }}
          ></div>
          <div
            name="changeRole"
            className={cl.travelOrUp}
            style={{
              backgroundImage: `url(${uppImg})`,
              display: fakeRole
                ? 'none'
                : props.user.role === 'USER'
                ? ''
                : 'none',
            }}
            onClick={() => changeRole()}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default OneAdmin
