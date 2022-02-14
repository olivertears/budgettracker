import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cl from './RecoveryWindow.module.css'
import { useTranslation } from 'react-i18next'
import open from './EyeImg/Open.png'
import close from './EyeImg/Close.png'
import BackButton from '../../ReusedElements/BackButton/BackButton'
import axios from 'axios'

const RecoveryWindow = (props) => {
  const { t } = useTranslation()
  const API = axios.create({
    baseURL: `https://budgettrackerjsonholder.herokuapp.com/`,
  })
  const headers = {
    'Content-Type': 'application/json',
  }
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [eyeOpen, setEyeOpen] = useState(close)
  const [recoveryCode, setRecoveryCode] = useState('')
  const [codeVisible, setCodeVisible] = useState('none')

  useEffect(() => {
    const wrap = document.getElementById('wrapRecovery')
    if (codeVisible === '') {
      wrap.style.height = '300px'
      wrap.style.top = '160px'
    } else {
      wrap.style.height = '260px'
      wrap.style.top = '190px'
    }
  }, [codeVisible])

  useEffect(() => {
    const passInp = document.getElementById('password')
    const confirmPassInp = document.getElementById('confirmPassword')
    const eye = document.getElementsByName('passwordEye')

    if (pass) {
      eye[0].style.backgroundImage = `url(${eyeOpen})`
    } else {
      eye[0].style.backgroundImage = ''
    }

    if (confirmPass) {
      eye[1].style.backgroundImage = `url(${eyeOpen})`
    } else {
      eye[1].style.backgroundImage = ''
    }

    if (eyeOpen === open) {
      passInp.type = 'text'
      confirmPassInp.type = 'text'
    } else {
      passInp.type = 'password'
      confirmPassInp.type = 'password'
    }
  }, [pass, confirmPass, eyeOpen])

  const validation = () => {
    const emailInp = document.getElementById('recoveryLogin')
    const passInp = document.getElementById('password')
    const confirmPassInp = document.getElementById('confirmPassword')

    let noMistakes = true

    const emailRegExp = new RegExp(/^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i)

    let validEmail = emailRegExp.test(email)
    if (!validEmail) {
      emailInp.placeholder = `${t('email_does_not_exist')}`
      emailInp.setAttribute('class', 'inputForRegistrationMistake')
      setEmail('')
      noMistakes = false
    }

    if (pass !== confirmPass) {
      setPass('')
      setConfirmPass('')
      passInp.className = 'inputForRegistrationMistake'
      confirmPassInp.className = 'inputForRegistrationMistake'
      passInp.placeholder = `${t('passwords_do_not_match')}`
      confirmPassInp.placeholder = `${t('passwords_do_not_match')}`
      noMistakes = false
    } else if (pass.length < 4) {
      setPass('')
      setConfirmPass('')
      passInp.className = 'inputForRegistrationMistake'
      confirmPassInp.className = 'inputForRegistrationMistake'
      passInp.placeholder = `${t('password_min_length')}`
      confirmPassInp.placeholder = `${t('password_min_length')}`
      noMistakes = false
    }

    return noMistakes
  }

  const checkAndCreate = (checkNumber) => {
    const emailInp = document.getElementById('recoveryLogin')
    const passInp = document.getElementById('password')
    const confirmPassInp = document.getElementById('confirmPassword')
    const codeInp = document.getElementById('recoveryCode')

    let noMistakes = validation()

    const params = {
      email: email.toLowerCase(),
    }

    const confirmRecoveryData = {
      code: recoveryCode,
      newPassword: pass,
    }

    if (noMistakes) {
      checkNumber === 1
        ? API.post('api/forgot_password', null, {
            headers,
            params,
          })
            .then((res) => {
              setCodeVisible('')
              emailInp.disabled = true
              emailInp.style.cursor = 'not-allowed'
              passInp.disabled = true
              passInp.style.cursor = 'not-allowed'
              confirmPassInp.disabled = true
              confirmPassInp.style.cursor = 'not-allowed'
            })
            .catch((err) => {
              setEmail('')
              emailInp.placeholder = `${t('mail_not_registered')}`
              emailInp.className = 'inputForRegistrationMistake'
            })
        : API.put('api/reset_password', JSON.stringify(confirmRecoveryData), {
            headers,
          })
            .then((res) => {
              navigate('../login')
              localStorage.setItem('lastVisited', 'login')
            })
            .catch((err) => {
              setRecoveryCode('')
              codeInp.placeholder = `${t('wrong_code')}`
              codeInp.className = 'inputForRegistrationMistake'
            })
    }
  }

  return (
    <div className={cl.wrapForLogin} id="wrapRecovery">
      <div className={cl.header}>
        <h1 className={cl.loginTxt}>{t('recovery')}</h1>
        <div
          className={cl.wrapForBackBtn}
          onClick={() => {
            navigate('../login')
            localStorage.removeItem('loginRecovery')
            localStorage.setItem('lastVisited', 'login')
          }}
        >
          <BackButton />
        </div>
      </div>

      <input
        id="recoveryLogin"
        className={
          props.mode === 'dark'
            ? 'inputForRegistrationDark'
            : 'inputForRegistration'
        }
        placeholder={t('email')}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
          props.mode === 'dark'
            ? (e.target.className = 'inputForRegistrationDark')
            : (e.target.className = 'inputForRegistration')
        }}
      ></input>

      <div className={cl.wrapForPassInput}>
        <input
          id="password"
          value={pass}
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
          name="passwordEye"
          className={cl.showPassOrNot}
          onClick={() =>
            eyeOpen === open ? setEyeOpen(close) : setEyeOpen(open)
          }
        ></div>
      </div>

      <div className={cl.wrapForPassInput}>
        <input
          className={
            props.mode === 'dark'
              ? 'inputForRegistrationDark'
              : 'inputForRegistration'
          }
          id="confirmPassword"
          value={confirmPass}
          placeholder={t('confirm_password')}
          onChange={(e) => {
            setConfirmPass(e.target.value)
            props.mode === 'dark'
              ? (e.target.className = 'inputForRegistrationDark')
              : (e.target.className = 'inputForRegistration')
          }}
        ></input>
        <div
          name="passwordEye"
          className={cl.showPassOrNot}
          onClick={() =>
            eyeOpen === open ? setEyeOpen(close) : setEyeOpen(open)
          }
        ></div>
      </div>

      <input
        value={recoveryCode}
        id="recoveryCode"
        className={
          props.mode === 'dark'
            ? 'inputForRegistrationDark'
            : 'inputForRegistration'
        }
        placeholder={t('recovery_code')}
        style={{
          display: codeVisible,
        }}
        onChange={(e) => {
          setRecoveryCode(e.target.value)
          props.mode === 'dark'
            ? (e.target.className = 'inputForRegistrationDark')
            : (e.target.className = 'inputForRegistration')
        }}
      ></input>

      <button
        className={cl.loginBtn}
        onClick={() => {
          codeVisible === 'none' ? checkAndCreate(1) : checkAndCreate(2)
        }}
      >
        <h1 className={cl.insideLoginBtn}>{t('save')}</h1>
      </button>
    </div>
  )
}

export default RecoveryWindow
