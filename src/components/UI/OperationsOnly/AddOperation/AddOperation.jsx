import React, { useState } from 'react'
import { useEffect } from 'react/cjs/react.development'
import CloseButton from '../../ReusedElements/CloseButton/CloseButton'
import NewOperation from '../NewOperation/NewOperation'
import cl from './AddOperation.module.css'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

const AddOperation = (props) => {
  const { t } = useTranslation()
  const API = axios.create({
    baseURL: `https://budgettrackerjsonholder.herokuapp.com/`,
  })
  const headers = {
    'Content-Type': 'application/json',
    Authorization: props.token,
  }

  let check = ''
  let checkData = true

  if (!props.visible) {
    check = 'none'
  }

  if (props.visible) {
    const inp = document.getElementById('addNewCatBtn')
    inp.style.cursor = 'not-allowed'
    if (props.amount) {
      if (props.category !== '') {
        checkData = false
        inp.style.cursor = 'pointer'
      }
    }
  }

  useEffect(() => {
    API.get(`api/users/${props.userId}/operations`).then((res) => {
      localStorage.setItem('allOperations', JSON.stringify(res.data))
    })
  }, [props.allOperations])

  let d = new Date()
  let now =
    d.getFullYear() +
    '-' +
    ('0' + (d.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + d.getDate()).slice(-2)

  useEffect(() => {
    props.setDate(now)
  }, [])

  const addNewOperation = () => {
    if (props.changeOppId) {
      let changeOpp = props.allOperations.find(
        (opp) => opp.id === props.changeOppId
      )
      changeOpp.amount = props.amount
      changeOpp.categoryName = props.category
      changeOpp.createdDate = props.date

      props.changeAllOperations([...props.allOperations])

      const newOperation = {
        id: props.changeOppId,
        createdDate: props.date,
        amount: Number(props.amount),
        categoryName: props.category,
        userId: props.userId,
      }

      API.put('api/operations', JSON.stringify(newOperation), { headers })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err.response.data.message))
    } else {
      const newOperation = {
        id: Date.now(),
        createdDate: props.date,
        amount: Number(props.amount),
        categoryName: props.category,
        userId: props.userId,
      }

      const reloadOppId = async () => {
        try {
          const postNewOpp = await API.post(
            'api/operations',
            JSON.stringify(newOperation),
            {
              headers,
            }
          )
          const fullOpp = await API.get(`api/users/${props.userId}/operations`)

          props.changeAllOperations(fullOpp.data)
        } catch (err) {
          console.log(err.response)
        }
      }

      reloadOppId()
    }
    props.setVisible(false)
    props.setDate(now)
    props.setAmount('')
    props.setCategory('')
    if (props.changeOppId) props.setChangeOppId('')
  }

  return (
    <div
      className={cl.full}
      style={{
        display: check,
      }}
    >
      <div
        className={cl.wrap}
        style={{ background: props.mode === 'dark' ? '#333' : '#c4c4c4' }}
      >
        <div className={cl.header}>
          <h1 className={cl.header}>{t('add_operation')}</h1>
          <div
            className={cl.close}
            onClick={() => {
              props.setVisible(false)
              props.setDate(now)
              props.setAmount('')
              props.setCategory('')
              if (props.changeOppId) props.setChangeOppId('')
            }}
          >
            <CloseButton />
          </div>
        </div>
        <div className={cl.part}>
          <h3 style={{ color: props.mode === 'dark' ? '#f0f8ff' : 'black' }}>
            {t('section')}
          </h3>
          <div className={cl.data}>
            <select
              value={props.section}
              onChange={() => {
                if (props.section === 'Expense') {
                  props.showCat('Income')
                  localStorage.setItem('section', JSON.stringify('Income'))
                } else {
                  props.showCat('Expense')
                  localStorage.setItem('section', JSON.stringify('Expense'))
                }
              }}
            >
              <option value={'Expense'}>{t('expense')}</option>
              <option value={'Income'}>{t('income')}</option>
            </select>
          </div>
        </div>
        <div className={cl.part}>
          <h3 style={{ color: props.mode === 'dark' ? '#f0f8ff' : 'black' }}>
            {t('category')}
          </h3>
          <div className={cl.data}>
            <select
              value={props.category}
              id="categorySelect"
              onChange={(e) => props.setCategory(e.target.value)}
            ></select>
          </div>
        </div>
        <div className={cl.part}>
          <h3 style={{ color: props.mode === 'dark' ? '#f0f8ff' : 'black' }}>
            {t('date')}
          </h3>
          <div className={cl.data}>
            <input
              value={props.date}
              onChange={(e) => props.setDate(e.target.value)}
              type="date"
            ></input>
          </div>
        </div>
        <div className={cl.part}>
          <h3 style={{ color: props.mode === 'dark' ? '#f0f8ff' : 'black' }}>
            {t('amount')}
          </h3>
          <div className={cl.data}>
            <input
              onKeyDown={(e) => {
                if (['+', '-', 'e'].includes(e.key)) {
                  e.preventDefault()
                }
              }}
              min="0.00"
              placeholder="0.00"
              value={props.amount}
              onChange={(e) => props.setAmount(e.target.value)}
              type="number"
              step="0.01"
            ></input>
          </div>
        </div>
        <div className={cl.wrapForSaveInput}>
          <input
            type="button"
            value={t('save')}
            className={cl.create}
            onClick={() => addNewOperation()}
            id="addNewCatBtn"
            disabled={checkData}
          ></input>
        </div>
      </div>
    </div>
  )
}

export default AddOperation
