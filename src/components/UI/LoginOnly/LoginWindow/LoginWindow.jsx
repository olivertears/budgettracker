import React from 'react'
import { Link } from 'react-router-dom'
import cl from './LoginWindow.module.css'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import open from './EyeImg/Open.png'
import close from './EyeImg/Close.png'
import axios from 'axios'

const LoginWindow = (props) => {
  const { t } = useTranslation()

  const API = axios.create({
    baseURL: `https://budgettrackerjsonholder.herokuapp.com/`,
  })
  const headers = {
    'Content-Type': 'application/json',
  }

  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [eyeOpen, setEyeOpen] = useState(close)

  const validation = () => {
    let noMistakes = true

    const emailInput = document.getElementById('emailLogin')
    const passInput = document.getElementById('passwordInput')

    const emailRegExp = new RegExp(/^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i)

    let validEmail = emailRegExp.test(email)
    if (!validEmail) {
      emailInput.placeholder = `${t('email_does_not_exist')}`
      emailInput.setAttribute('class', 'inputForRegistrationMistake')
      setEmail('')
      noMistakes = false
    }

    if (pass.length < 4) {
      passInput.placeholder = `${t('password_min_length')}`
      passInput.setAttribute('class', 'inputForRegistrationMistake')
      setPass('')
      noMistakes = false
    }

    return noMistakes
  }

  const checkAndCreate = () => {
    const emailInput = document.getElementById('emailLogin')
    const passInput = document.getElementById('passwordInput')

    let noMistakes = validation()

    if (noMistakes) {
      const authData = {
        email: email.toLowerCase(),
        password: pass,
      }

      async function Login() {
        try {
          const login = await API.post(
            'api/auth/login',
            JSON.stringify(authData),
            { headers }
          )
          const userId = login.data.userId
          const user = await API.get(`api/users/${userId}`)
          const categories = await API.get(`api/users/${userId}/categories`)
          const operations = await API.get(`api/users/${userId}/operations`)

          localStorage.setItem('token', JSON.stringify(login.data.token))

          localStorage.setItem('confirmed', JSON.stringify(user.data.confirmed))
          localStorage.setItem(
            'createdDate',
            JSON.stringify(user.data.createdDate)
          )
          localStorage.setItem('currency', JSON.stringify(user.data.currency))
          localStorage.setItem('email', JSON.stringify(user.data.email))
          localStorage.setItem('userId', JSON.stringify(user.data.id))
          localStorage.setItem('language', JSON.stringify(user.data.language))
          document.cookie = `i18next=${user.data.language}`
          localStorage.setItem('mode', JSON.stringify(user.data.mode))
          localStorage.setItem('nickname', JSON.stringify(user.data.nickname))
          localStorage.setItem('role', JSON.stringify(user.data.role))
          localStorage.setItem('section', JSON.stringify('Expense'))

          localStorage.setItem('allCategories', JSON.stringify(categories.data))
          localStorage.setItem('allOperations', JSON.stringify(operations.data))

          localStorage.setItem('lastVisited', JSON.stringify('/report'))
          localStorage.setItem('isAuth', JSON.stringify(true))
          localStorage.setItem('isTravel', JSON.stringify(false))

          window.location.reload()
          setEmail('')
          setPass('')
          setEyeOpen(close)
        } catch (err) {
          setEmail('')
          emailInput.placeholder = `${t('invalid_input')}`
          emailInput.className = 'inputForRegistrationMistake'
          setPass('')
          passInput.placeholder = `${t('invalid_input')}`
          passInput.className = 'inputForRegistrationMistake'
        }
      }

      Login()
    }
  }

  useEffect(() => {
    const passInput = document.getElementById('passwordInput')
    const eye = document.getElementById('passwordEye')
    if (pass) {
      eye.style.backgroundImage = `url(${eyeOpen})`
    } else {
      eye.style.backgroundImage = ''
    }
    eyeOpen === open ? (passInput.type = 'text') : (passInput.type = 'password')
  }, [pass, eyeOpen])

  return (
    <div className={cl.wrapForLogin} id="wrap">
      <h1 className={cl.loginTxt}>{t('autorization')}</h1>
      <input
        id="emailLogin"
        value={email}
        className={
          props.mode === 'dark'
            ? 'inputForRegistrationDark'
            : 'inputForRegistration'
        }
        placeholder={t('email')}
        onChange={(e) => {
          setEmail(e.target.value)
          props.mode === 'dark'
            ? (e.target.className = 'inputForRegistrationDark')
            : (e.target.className = 'inputForRegistration')
        }}
      ></input>

      <div className={cl.wrapForPassInput}>
        <input
          value={pass}
          id="passwordInput"
          className={
            props.mode === 'dark'
              ? 'inputForRegistrationDark'
              : 'inputForRegistration'
          }
          placeholder={t('password')}
          onChange={(e) => {
            setPass(e.target.value)
            props.mode === 'dark'
              ? (e.target.className = 'inputForRegistrationDark')
              : (e.target.className = 'inputForRegistration')
          }}
        ></input>
        <div
          id="passwordEye"
          className={cl.showPassOrNot}
          onClick={() =>
            eyeOpen === open ? setEyeOpen(close) : setEyeOpen(open)
          }
        ></div>
      </div>

      <button className={cl.loginBtn} onClick={() => checkAndCreate()}>
        <h1 className={cl.insideLoginBtn}>{t('enter')}</h1>
      </button>

      <div className={cl.linkToRegistration}>
        <h4 className={cl.simpleTxt}>{t('forgot_passwaord')} —</h4>
        <div>&nbsp;</div>
        <Link to="/recovery" style={{ height: '0px' }}>
          <h4
            className={cl.linkToRegistration}
            onClick={() => {
              localStorage.setItem('lastVisited', JSON.stringify('/recovery'))
            }}
          >
            {t('recover')}
          </h4>
        </Link>
      </div>

      <div className={cl.linkToRegistration}>
        <h4 className={cl.simpleTxt}>{t('no_account')} —</h4>
        <div>&nbsp;</div>
        <Link to="/registration" style={{ height: '0px' }}>
          <h4
            className={cl.linkToRegistration}
            onClick={() =>
              localStorage.setItem(
                'lastVisited',
                JSON.stringify('/registration')
              )
            }
          >
            {t('sign_up')}
          </h4>
        </Link>
      </div>
    </div>
  )
}

export default LoginWindow
