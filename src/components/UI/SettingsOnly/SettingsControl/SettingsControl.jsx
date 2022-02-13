import React from 'react'
import { useEffect, useState } from 'react/cjs/react.development'
import SettingsAllUsers from '../SettingsAllUsers/SettingsAllUsers'
import SettingsCurrency from '../SettingsCurrency/SettingsCurrency'
import SettingsLanguage from '../SettingsLanguage/SettingsLanguage'
import SettingsMode from '../SettingsMode/SettingsMode'
import SettingsProfile from '../SettingsProfile/SettingsProfile'
import Warning from '../Warning/Warning'
import cl from './SettingsControl.module.css'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

const SettingsControl = (props) => {
  const { t } = useTranslation()
  const API = axios.create({
    baseURL: `https://budgettrackerjsonholder.herokuapp.com/`,
  })

  const [profOff, setProfOn] = useState('none')
  const [langOff, setLangOn] = useState('none')
  const [modeOff, setModeOn] = useState('none')
  const [curOff, setCurOn] = useState('none')
  const [allUsersOff, setAllUsersOn] = useState('none')

  const [warningHeader, setWarningHeader] = useState(' ')
  const [warningBody, setWarningBody] = useState(['', ''])

  const [nickValue, setNickValue] = useState('')
  const [passValue, setPassValue] = useState('')
  const [oldPassValue, setOldPassValue] = useState('')

  const [isWarning, setIsWarning] = useState('none')

  const changeStatus = (status, setStatus, otherStatuses) => {
    if (status === '') {
      setStatus('none')
    } else {
      setStatus('')
      for (let i in otherStatuses) {
        otherStatuses[i]('none')
      }
    }
  }

  useEffect(() => {
    const arrOfState = [profOff, langOff, modeOff, curOff, allUsersOff]
    const arrOfDiv = document.getElementsByName('divBackground')
    const arrOfH1 = document.getElementsByName('h1Color')

    for (let i in arrOfState) {
      if (arrOfState[i] === '') {
        props.mode === 'dark'
          ? (arrOfDiv[i].style.background = '#202020')
          : (arrOfDiv[i].style.background = '#54626D')
        arrOfH1[i].style.color = '#f0f8ff'
      } else {
        arrOfDiv[i].style.background = ''
        props.mode === 'dark'
          ? (arrOfH1[i].style.color = '#f0f8ff')
          : (arrOfH1[i].style.color = 'black')
      }
    }
  }, [profOff, langOff, modeOff, curOff, allUsersOff, props.mode])

  async function requestAllUsers() {
    if (allUsersOff === 'none') {
      const users = await API.get('api/users')
      props.changeAllUsers(users.data)
      localStorage.setItem('allUsers', JSON.stringify(users.data))
      changeStatus(allUsersOff, setAllUsersOn, [
        setProfOn,
        setLangOn,
        setModeOn,
        setCurOn,
      ])
    }
  }

  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem('settings'))
    if (settings) {
      setProfOn(settings.profOff)
      setLangOn(settings.langOff)
      setModeOn(settings.modeOff)
      setCurOn(settings.curOff)
      setAllUsersOn(settings.allUsersOff)
    }
  }, [])

  useEffect(() => {
    const settings = {
      profOff: profOff,
      langOff: langOff,
      modeOff: modeOff,
      curOff: curOff,
      allUsersOff: allUsersOff,
    }

    localStorage.setItem('settings', JSON.stringify(settings))
  }, [profOff, langOff, modeOff, curOff, allUsersOff])

  return (
    <div
      className={cl.setWrap}
      style={{ background: props.mode === 'dark' ? '#333' : '#c4c4c4' }}
    >
      <Warning
        isWarning={isWarning}
        setIsWarning={setIsWarning}
        warningHeader={warningHeader}
        warningBody={warningBody}
        setNickValue={setNickValue}
        mode={props.mode}
        passValue={passValue}
        setPassValue={setPassValue}
        oldPassValue={oldPassValue}
        setOldPassValue={setOldPassValue}
        token={props.token}
        userId={props.userId}
      />
      <div
        name="divBackground"
        className={props.mode === 'dark' ? cl.setDark : cl.set}
        onClick={() =>
          changeStatus(profOff, setProfOn, [
            setLangOn,
            setModeOn,
            setCurOn,
            setAllUsersOn,
          ])
        }
      >
        <h1
          name="h1Color"
          className={cl.set}
          style={{ color: props.mode === 'dark' ? '#f0f8ff' : 'black' }}
        >
          {t('profile')}
        </h1>
      </div>
      <SettingsProfile
        checkProf={profOff}
        setIsWarning={setIsWarning}
        setWarningHeader={setWarningHeader}
        setWarningBody={setWarningBody}
        nickValue={nickValue}
        setNickValue={setNickValue}
        passValue={passValue}
        setPassValue={setPassValue}
        mode={props.mode}
        email={props.email}
        createdDate={props.createdDate}
        nickname={props.nickname}
        role={props.role}
        confirmed={props.confirmed}
        oldPassValue={oldPassValue}
        setOldPassValue={setOldPassValue}
        userId={props.userId}
        createdDate={props.createdDate}
        role={props.role}
        confirmed={props.confirmed}
        language={props.language}
        currency={props.currency}
        mode={props.mode}
        token={props.token}
        setNickname={props.setNickname}
      />

      <div
        name="divBackground"
        className={props.mode === 'dark' ? cl.setDark : cl.set}
        onClick={() =>
          changeStatus(langOff, setLangOn, [
            setProfOn,
            setModeOn,
            setCurOn,
            setAllUsersOn,
          ])
        }
        style={{ background: '' }}
      >
        <h1
          name="h1Color"
          className={cl.set}
          style={{ color: props.mode === 'dark' ? '#f0f8ff' : 'black' }}
        >
          {t('language')}
        </h1>
      </div>
      <SettingsLanguage
        checkLang={langOff}
        language={props.language}
        setLanguage={props.setLanguage}
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

      <div
        name="divBackground"
        className={props.mode === 'dark' ? cl.setDark : cl.set}
        onClick={() =>
          changeStatus(modeOff, setModeOn, [
            setProfOn,
            setLangOn,
            setCurOn,
            setAllUsersOn,
          ])
        }
        style={{ background: '' }}
      >
        <h1
          name="h1Color"
          className={cl.set}
          style={{ color: props.mode === 'dark' ? '#f0f8ff' : 'black' }}
        >
          {t('mode')}
        </h1>
      </div>
      <SettingsMode
        name="element"
        checkMode={modeOff}
        mode={props.mode}
        setMode={props.setMode}
        nickname={props.nickname}
        email={props.email}
        userId={props.userId}
        createdDate={props.createdDate}
        role={props.role}
        confirmed={props.confirmed}
        language={props.language}
        currency={props.currency}
        token={props.token}
      />

      <div
        name="divBackground"
        className={props.mode === 'dark' ? cl.setDark : cl.set}
        onClick={() =>
          changeStatus(curOff, setCurOn, [
            setProfOn,
            setLangOn,
            setModeOn,
            setAllUsersOn,
          ])
        }
        style={{ background: '' }}
      >
        <h1
          name="h1Color"
          className={cl.set}
          style={{ color: props.mode === 'dark' ? '#f0f8ff' : 'black' }}
        >
          {t('currency')}
        </h1>
      </div>
      <SettingsCurrency
        checkCur={curOff}
        currency={props.currency}
        setCurrency={props.setCurrency}
        mode={props.mode}
        nickname={props.nickname}
        email={props.email}
        userId={props.userId}
        createdDate={props.createdDate}
        role={props.role}
        confirmed={props.confirmed}
        language={props.language}
        token={props.token}
      />

      <div
        name="divBackground"
        className={props.mode === 'dark' ? cl.setDark : cl.set}
        onClick={() => {
          changeStatus(allUsersOff, setAllUsersOn, [
            setProfOn,
            setLangOn,
            setModeOn,
            setCurOn,
          ])
          requestAllUsers()
        }}
        style={{ background: '' }}
      >
        <h1
          name="h1Color"
          className={cl.set}
          style={{ color: props.mode === 'dark' ? '#f0f8ff' : 'black' }}
        >
          {t('all_users')}
        </h1>
      </div>
      <SettingsAllUsers
        allUsers={props.allUsers}
        checkUsers={allUsersOff}
        mode={props.mode}
        role={props.role}
        setRole={props.setRole}
        language={props.language}
        setIsTravel={props.setIsTravel}
        token={props.token}
        userId={props.userId}
      />
    </div>
  )
}

export default SettingsControl
