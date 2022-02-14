import React, { useState, useMemo, useEffect, useRef } from 'react'
import Navbar from './components/UI/Navbar/Navbar'
import './styles/App.css'
import Operations from './components/pages/Operations'
import Settings from './components/pages/Settings'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Report from './components/pages/Report'
import Categories from './components/pages/Categories'
import { logos } from './images.js'
import { colors } from './images.js'
import Login from './components/pages/Login'
import Registration from './components/pages/Registration'
import Recovery from './components/pages/Recovery'
import TravelBackBtn from './components/UI/SettingsOnly/TravelBackBtn/TravelBackBtn'

function App() {
  const [visible, setVisible] = useState(false)
  const [isAuth, setIsAuth] = useState(false)
  const auth = useRef(false)
  const [lastVisited, setLastVisited] = useState('/login')
  const [isTravel, setIsTravel] = useState(false)
  const [token, setToken] = useState('')

  // Arrays
  const [allUsers, changeAllUsers] = useState([])
  const [allCategories, changeAllCategories] = useState([])
  const [allOperations, changeAllOperations] = useState([])

  // User Object
  const [nickname, setNickname] = useState('vitalyableat')
  const [email, setEmail] = useState('vitalyableat@gmail.com')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('USER')
  const [confirmed, setConfirmed] = useState(false)
  const [createdDate, setCreatedDate] = useState('2022-01-01')
  const [userId, setUserId] = useState()
  // Settings
  const [language, setLanguage] = useState('en')
  const [mode, setMode] = useState('light')
  const [currency, setCurrency] = useState('$')

  // Category Object
  const [section, setSection] = useState('Expense')
  const [category, setCategory] = useState('')
  const [logo, setLogo] = useState(logos[0])
  const [color, setColor] = useState(colors[0])
  // const [categoryId, setCategoryId] = useState()

  // Operation Object
  const [date, setDate] = useState('')
  const [amount, setAmount] = useState('')
  // const [operationId, setOperationId] = useState()

  useEffect(() => {
    if (isAuth) {
      auth.current = true

      setLastVisited(JSON.parse(localStorage.getItem('lastVisited')))

      changeAllOperations(JSON.parse(localStorage.getItem('allOperations')))
      changeAllCategories(JSON.parse(localStorage.getItem('allCategories')))

      setConfirmed(JSON.parse(localStorage.getItem('confirmed')))
      setCreatedDate(JSON.parse(localStorage.getItem('createdDate')))
      setCurrency(JSON.parse(localStorage.getItem('currency')))
      setEmail(JSON.parse(localStorage.getItem('email')))
      setUserId(JSON.parse(localStorage.getItem('userId')))
      setLanguage(JSON.parse(localStorage.getItem('language')))
      setMode(JSON.parse(localStorage.getItem('mode')))
      setNickname(JSON.parse(localStorage.getItem('nickname')))
      setRole(JSON.parse(localStorage.getItem('role')))
      setToken(JSON.parse(localStorage.getItem('token')))

      setSection(JSON.parse(localStorage.getItem('section')))
    }
  }, [isAuth])

  useEffect(() => {
    auth.current = JSON.parse(localStorage.getItem('isAuth'))
    if (auth.current) {
      setLastVisited(JSON.parse(localStorage.getItem('lastVisited')))
      changeAllOperations(JSON.parse(localStorage.getItem('allOperations')))
      changeAllCategories(JSON.parse(localStorage.getItem('allCategories')))

      setConfirmed(JSON.parse(localStorage.getItem('confirmed')))
      setCurrency(JSON.parse(localStorage.getItem('currency')))
      setLanguage(JSON.parse(localStorage.getItem('language')))
      setNickname(JSON.parse(localStorage.getItem('nickname')))
      setRole(JSON.parse(localStorage.getItem('role')))
      setSection(JSON.parse(localStorage.getItem('section')))

      setCreatedDate(JSON.parse(localStorage.getItem('createdDate')))
      setEmail(JSON.parse(localStorage.getItem('email')))
      setUserId(JSON.parse(localStorage.getItem('userId')))
      setToken(JSON.parse(localStorage.getItem('token')))

      setIsTravel(JSON.parse(localStorage.getItem('isTravel')))

      if (localStorage.getItem('startDate'))
        setDateStart(JSON.parse(localStorage.getItem('startDate')))
      if (localStorage.getItem('endDate'))
        setDateEnd(JSON.parse(localStorage.getItem('endDate')))
      if (localStorage.getItem('allUsers'))
        changeAllUsers(JSON.parse(localStorage.getItem('allUsers')))
    }
  }, [])

  useEffect(() => {
    setMode(JSON.parse(localStorage.getItem('mode')))
  }, [])

  useEffect(() => {
    if (auth.current) {
      if (isTravel) {
        changeAllCategories(
          JSON.parse(localStorage.getItem('travelCategories'))
        )
        changeAllOperations(
          JSON.parse(localStorage.getItem('travelOperations'))
        )
      } else {
        changeAllCategories(JSON.parse(localStorage.getItem('allCategories')))
        changeAllOperations(JSON.parse(localStorage.getItem('allOperations')))
      }
    }
  }, [isTravel])

  const filteredCategories = useMemo(() => {
    return [...allCategories]
      .sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1
        }
        return 0
      })
      .filter((cat) => cat.section === section)
  }, [allCategories, section])

  const [arrToHide, setArrToHide] = useState([])
  const [catToHide, setCatToHide] = useState('')

  useEffect(() => {
    if (catToHide !== '') {
      let idx = arrToHide.indexOf(catToHide)
      if (idx === -1) {
        setArrToHide(
          [...arrToHide, catToHide].sort((a, b) => {
            if (a < b) {
              return -1
            }
            if (a > b) {
              return 1
            }
            return 0
          })
        )
      } else {
        arrToHide.splice(idx, 1)
        setArrToHide([...arrToHide])
      }
      setCatToHide('')
    }
  }, [catToHide, section])

  const filteredCatForReport = useMemo(() => {
    let arr = [...allCategories].filter((cat) => cat.section === section)
    for (let i in arrToHide) {
      let idx = arr.findIndex((cat) => cat.name === arrToHide[i])
      if (idx >= 0) {
        arr.splice(idx, 1)
      }
    }

    return arr
  }, [allCategories, arrToHide, section])

  const showCat = (sect) => {
    setSection(sect)
    const select = document.getElementById('categorySelect')
    let bull = false
    select.options.length = 0
    for (let i in allCategories) {
      if (allCategories[i].section === sect) {
        let option = document.createElement('option')
        option.value = allCategories[i].name
        option.innerHTML = allCategories[i].name
        select.add(option)
        bull = true
      }
    }

    if (!bull) {
      select.disabled = true
      setCategory('')
    } else {
      select.disabled = false
      setCategory(select.options[0].value)
    }
  }

  let d = new Date()
  let nowEnd =
    d.getFullYear() +
    '-' +
    ('0' + (d.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + d.getDate()).slice(-2)
  let nowStart =
    d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + '01'

  const [dateStart, setDateStart] = useState(nowStart)
  const [dateEnd, setDateEnd] = useState(nowEnd)

  const changeDate = (start, end) => {
    if (start.target) {
      setDateStart(start.target.value)
      localStorage.setItem('startDate', JSON.stringify(start.target.value))
    }
    if (end.target) {
      setDateEnd(end.target.value)
      localStorage.setItem('endDate', JSON.stringify(end.target.value))
    }
  }

  const filteredOperations = useMemo(() => {
    return [...allOperations]
      .sort((a, b) => {
        if (a.id < b.id) {
          return 1
        }
        if (a.id > b.id) {
          return -1
        }
        return 0
      })
      .sort((a, b) => {
        if (a.createdDate < b.createdDate) {
          return 1
        }
        if (a.createdDate > b.createdDate) {
          return -1
        }
        return 0
      })
      .filter(
        (opp) => opp.createdDate >= dateStart && opp.createdDate <= dateEnd
      )
  }, [dateStart, dateEnd, allOperations])

  return (
    <BrowserRouter>
      <div className="App">
        {isTravel ? (
          <TravelBackBtn setIsTravel={setIsTravel} />
        ) : (
          <Navbar
            setVisible={setVisible}
            setSection={setSection}
            showCat={showCat}
            setAmount={setAmount}
            section={section}
          />
        )}
      </div>

      {auth.current ? (
        <Routes>
          <Route
            path="/operations"
            element={
              <Operations
                visible={visible}
                setVisible={setVisible}
                section={section}
                setSection={setSection}
                allCategories={allCategories}
                date={date}
                setDate={setDate}
                amount={amount}
                setAmount={setAmount}
                allOperations={allOperations}
                changeAllOperations={changeAllOperations}
                section={section}
                setSection={setSection}
                filteredCategories={filteredCategories}
                showCat={showCat}
                category={category}
                setCategory={setCategory}
                filteredOperations={filteredOperations}
                dateStart={dateStart}
                dateEnd={dateEnd}
                setDateStart={setDateStart}
                setDateEnd={setDateEnd}
                changeDate={changeDate}
                mode={mode}
                currency={currency}
                token={token}
                userId={userId}
                isTravel={isTravel}
              />
            }
          />
          <Route
            path="/report"
            element={
              <Report
                visible={visible}
                setVisible={setVisible}
                allOperations={allOperations}
                changeAllOperations={changeAllOperations}
                date={date}
                setDate={setDate}
                amount={amount}
                setAmount={setAmount}
                section={section}
                setSection={setSection}
                filteredCategories={filteredCategories}
                filteredCatForReport={filteredCatForReport}
                showCat={showCat}
                category={category}
                setCategory={setCategory}
                allCategories={allCategories}
                colors={colors}
                filteredOperations={filteredOperations}
                setCatToHide={setCatToHide}
                arrToHide={arrToHide}
                setArrToHide={setArrToHide}
                mode={mode}
                currency={currency}
                token={token}
                userId={userId}
              />
            }
          />
          <Route
            path="/categories"
            element={
              <Categories
                showCat={showCat}
                category={category}
                setCategory={setCategory}
                filteredCategories={filteredCategories}
                amount={amount}
                setAmount={setAmount}
                date={date}
                setDate={setDate}
                allOperations={allOperations}
                changeAllOperations={changeAllOperations}
                visible={visible}
                setVisible={setVisible}
                allCategories={allCategories}
                changeAllCategories={changeAllCategories}
                section={section}
                setSection={setSection}
                category={category}
                setCategory={setCategory}
                logo={logo}
                setLogo={setLogo}
                color={color}
                setColor={setColor}
                logos={logos}
                colors={colors}
                filteredCategories={filteredCategories}
                visible={visible}
                mode={mode}
                confirmed={confirmed}
                setConfirmed={setConfirmed}
                userId={userId}
                token={token}
                isTravel={isTravel}
              />
            }
          />
          <Route
            path="/settings"
            element={
              <Settings
                visible={visible}
                setVisible={setVisible}
                allOperations={allOperations}
                changeAllOperations={changeAllOperations}
                date={date}
                setDate={setDate}
                amount={amount}
                setAmount={setAmount}
                section={section}
                setSection={setSection}
                filteredCategories={filteredCategories}
                showCat={showCat}
                category={category}
                setCategory={setCategory}
                language={language}
                setLanguage={setLanguage}
                mode={mode}
                setMode={setMode}
                currency={currency}
                setCurrency={setCurrency}
                mode={mode}
                setIsAuth={setIsAuth}
                email={email}
                createdDate={createdDate}
                nickname={nickname}
                role={role}
                setRole={setRole}
                confirmed={confirmed}
                allUsers={allUsers}
                setIsTravel={setIsTravel}
                auth={auth}
                token={token}
                changeAllUsers={changeAllUsers}
                userId={userId}
                setNickname={setNickname}
              />
            }
          />
          <Route path="*" element={<Navigate to={lastVisited} />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/login"
            element={<Login mode={mode} setIsAuth={setIsAuth} />}
          />
          <Route path="/recovery" element={<Recovery mode={mode} />} />
          <Route
            path="/registration"
            element={
              <Registration
                allUsers={allUsers}
                changeAllUsers={changeAllUsers}
                nickname={nickname}
                setNickname={setNickname}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                mode={mode}
              />
            }
          />
          <Route path="*" element={<Navigate to={lastVisited} />} />
        </Routes>
      )}
    </BrowserRouter>
  )
}

export default App
