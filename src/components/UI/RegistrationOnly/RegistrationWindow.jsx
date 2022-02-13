import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import cl from './RegistrationWindow.module.css'
import open from './EyeImg/Open.png'
import close from './EyeImg/Close.png'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

const RegistrationWindow = (props) => {
  const { t } = useTranslation()
  const API = axios.create({
    baseURL: `https://budgettrackerjsonholder.herokuapp.com/`,
  })
  const headers = {
    'Content-Type': 'application/json',
  }
  const navigate = useNavigate()

  const [newNick, setNewNick] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newPass, setNewPass] = useState('')
  const [checkPas, setCheckPas] = useState('')
  const [eyeOpen, setEyeOpen] = useState(false)

  useEffect(() => {
    const pass = document.getElementsByName('passwordInput')
    const passDiv = document.getElementsByName('passwordEye')

    if (eyeOpen) {
      passDiv[0].style.backgroundImage = `url(${open})`
      passDiv[1].style.backgroundImage = `url(${open})`
      pass[0].type = 'text'
      pass[1].type = 'text'
    } else {
      passDiv[0].style.backgroundImage = `url(${close})`
      passDiv[1].style.backgroundImage = `url(${close})`
      pass[0].type = 'password'
      pass[1].type = 'password'
    }

    if (newPass === '') passDiv[0].style.backgroundImage = ''
    if (checkPas === '') passDiv[1].style.backgroundImage = ''
  }, [eyeOpen, newPass, checkPas])

  const validation = () => {
    let noMistakes = true

    const nick = document.getElementById('nicknameInput')
    const email = document.getElementById('emailInput')
    const pass = document.getElementsByName('passwordInput')
    const passDiv = document.getElementsByName('passwordEye')

    const nickRegExp = new RegExp(/[\w_\.]/i)
    const emailRegExp = new RegExp(/^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i)

    let validNick = nickRegExp.test(newNick)
    if (!validNick) {
      nick.placeholder = `${t('existing_symbols')}`
      nick.setAttribute('class', 'inputForRegistrationMistake')
      setNewNick('')
      noMistakes = false
    }
    if (newNick.length === 0 || newNick.length > 30) {
      nick.placeholder = `${t('nick_length')}`
      nick.setAttribute('class', 'inputForRegistrationMistake')
      setNewNick('')
      noMistakes = false
    }

    let validEmail = emailRegExp.test(newEmail)
    if (!validEmail) {
      email.placeholder = `${t('email_does_not_exist')}`
      email.setAttribute('class', 'inputForRegistrationMistake')
      setNewEmail('')
      noMistakes = false
    }

    if (newPass !== checkPas) {
      pass[0].placeholder = `${t('passwords_do_not_match')}`
      pass[1].placeholder = `${t('passwords_do_not_match')}`
      pass[0].setAttribute('class', 'inputForRegistrationMistake')
      pass[1].setAttribute('class', 'inputForRegistrationMistake')
      passDiv[0].style.backgroundImage = 'none'
      passDiv[1].style.backgroundImage = 'none'
      setNewPass('')
      setCheckPas('')
      noMistakes = false
    }
    if (newPass.length < 4) {
      pass[0].placeholder = `${t('password_min_length')}`
      pass[1].placeholder = `${t('password_min_length')}`
      pass[0].setAttribute('class', 'inputForRegistrationMistake')
      pass[1].setAttribute('class', 'inputForRegistrationMistake')
      passDiv[0].style.backgroundImage = 'none'
      passDiv[1].style.backgroundImage = 'none'
      setNewPass('')
      setCheckPas('')
      noMistakes = false
    }

    return noMistakes
  }

  const checkAndCreate = () => {
    const nick = document.getElementById('nicknameInput')
    const email = document.getElementById('emailInput')

    let noMistakes = validation()
    if (noMistakes) {
      const newUser = {
        nickname: newNick.toLowerCase(),
        email: newEmail.toLowerCase(),
        password: newPass,
      }

      API.post('api/register', JSON.stringify(newUser), { headers })
        .then((res) => {
          setNewNick('')
          setNewEmail('')
          setNewPass('')
          setCheckPas('')
          navigate('../login')
          localStorage.setItem('lastVisited', 'login')
        })
        .catch((error) => {
          console.log(error.response.data.message)
          if (error.response.data.message.includes('and nickname')) {
            nick.placeholder = `${t('nick_already_exists')}`
            nick.setAttribute('class', 'inputForRegistrationMistake')
            setNewNick('')
            email.placeholder = `${t('mail_already_exists')}`
            email.setAttribute('class', 'inputForRegistrationMistake')
            setNewEmail('')
          } else if (error.response.data.message.includes('nickname')) {
            nick.placeholder = `${t('nick_already_exists')}`
            nick.setAttribute('class', 'inputForRegistrationMistake')
            setNewNick('')
          } else if (error.response.data.message.includes('email')) {
            email.placeholder = `${t('mail_already_exists')}`
            email.setAttribute('class', 'inputForRegistrationMistake')
            setNewEmail('')
          }
        })
    }
  }

  return (
    <div className={cl.wrapForLogin}>
      <h1 className={cl.loginTxt}>{t('registration')}</h1>

      <input
        className={
          props.mode === 'dark'
            ? cl.inputForRegistrationDark
            : cl.inputForRegistration
        }
        id="nicknameInput"
        value={newNick}
        placeholder={t('user_nickname')}
        onChange={(e) => {
          setNewNick(e.target.value)
          e.target.setAttribute(
            'class',
            props.mode === 'dark'
              ? 'inputForRegistrationDark'
              : 'inputForRegistration'
          )
          e.target.placeholder = `${t('user_nickname')}`
        }}
      ></input>

      <input
        className={
          props.mode === 'dark'
            ? cl.inputForRegistrationDark
            : cl.inputForRegistration
        }
        id="emailInput"
        value={newEmail}
        placeholder={t('email')}
        onChange={(e) => {
          setNewEmail(e.target.value)
          e.target.setAttribute(
            'class',
            props.mode === 'dark'
              ? 'inputForRegistrationDark'
              : 'inputForRegistration'
          )
          e.target.placeholder = `${t('email')}`
        }}
      ></input>

      <div className={cl.wrapForPassInput}>
        <input
          className={
            props.mode === 'dark'
              ? cl.inputForRegistrationDark
              : cl.inputForRegistration
          }
          name="passwordInput"
          type="password"
          value={newPass}
          placeholder={t('password')}
          onChange={(e) => {
            setNewPass(e.target.value)
            e.target.setAttribute(
              'class',
              props.mode === 'dark'
                ? 'inputForRegistrationDark'
                : 'inputForRegistration'
            )
            e.target.placeholder = `${t('password')}`
          }}
        ></input>
        <div
          name="passwordEye"
          className={cl.showPassOrNot}
          onClick={() => (eyeOpen ? setEyeOpen(false) : setEyeOpen(true))}
        ></div>
      </div>

      <div className={cl.wrapForPassInput}>
        <input
          className={
            props.mode === 'dark'
              ? cl.inputForRegistrationDark
              : cl.inputForRegistration
          }
          name="passwordInput"
          type="password"
          value={checkPas}
          placeholder={t('confirm_password')}
          onChange={(e) => {
            setCheckPas(e.target.value)
            e.target.setAttribute(
              'class',
              props.mode === 'dark'
                ? 'inputForRegistrationDark'
                : 'inputForRegistration'
            )
            e.target.placeholder = `${t('confirm_password')}`
          }}
        ></input>
        <div
          name="passwordEye"
          className={cl.showPassOrNot}
          onClick={() => (eyeOpen ? setEyeOpen(false) : setEyeOpen(true))}
        ></div>
      </div>

      <button className={cl.registrationBtn} onClick={() => checkAndCreate()}>
        <h1 className={cl.insideLoginBtn}>{t('create_account')}</h1>
      </button>

      <div className={cl.linkToRegistration}>
        <h4 className={cl.simpleTxt}>{t('have_account')} —</h4>
        <div>&nbsp;</div>
        <Link
          to="/login"
          style={{ height: '0px' }}
          onClick={() => {
            setNewNick('')
            setNewEmail('')
            setNewPass('')
            setCheckPas('')
            localStorage.setItem('lastVisited', 'login')
          }}
        >
          <h4 className={cl.linkToRegistration}>{t('sign_in')}</h4>
        </Link>
      </div>
    </div>
  )
}

export default RegistrationWindow
