import React from 'react'
import CloseButton from '../../ReusedElements/CloseButton/CloseButton'
import cl from './NewOperation.module.css'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

const NewOperation = (props) => {
  const { t } = useTranslation()
  const API = axios.create({
    baseURL: `https://budgettrackerjsonholder.herokuapp.com/`,
  })
  const headers = {
    'Content-Type': 'application/json',
    Authorization: props.token,
  }

  let x = 'black'

  const sayThatIsChange = () => {
    props.setVisible(true)
    props.setChangeOppId(props.operation.id)
    let changeOpp = props.allOperations.find(
      (opp) => opp.id === props.operation.id
    )
    props.setDate(changeOpp.createdDate)
    props.setAmount(changeOpp.amount)
    let cat = props.allCategories.find(
      (cat) => cat.name === props.operation.categoryName
    )
    props.setSection(cat.section)
    props.showCat(cat.section)
    props.setCategory(cat.name)
  }

  const check = (idOfOpp) => {
    API.delete(`api/operations/${idOfOpp}`, {
      headers,
    })
      .then((res) => {
        let index = props.allOperations.findIndex((op) => op.id === idOfOpp)
        props.allOperations.splice(index, 1)
        props.changeAllOperations([...props.allOperations])
      })
      .catch((err) => {
        console.log(err.response.data.message)
      })
  }

  let category = props.allCategories.find(
    (cat) => cat.name === props.operation.categoryName
  )

  /* if (category.section === 'Expense') {
    props.mode === 'dark' ? (x = '#fa8072') : (x = 'red')
  } else props.mode === 'dark' ? (x = '#90ee90') : (x = 'green') */
  props.mode === 'dark' ? (x = '#90ee90') : (x = 'green')

  return (
    <div
      className={cl.content}
      style={{ background: props.mode === 'dark' ? '#54626d' : '#e5e5e5' }}
    >
      <div className={cl.header}>
        <h2
          className={cl.date}
          style={{
            color: props.mode === 'dark' ? 'white' : 'black',
          }}
        >
          {props.operation.createdDate}
        </h2>
      </div>
      <hr
        style={{
          borderColor: props.mode === 'dark' ? '#54626d' : '#e5e5e5',
          background: props.mode === 'dark' ? 'white' : 'black',
        }}
      ></hr>
      <div className={cl.body}>
        <div className={cl.item}>
          <div
            className={cl.logo}
            /* style={{
              backgroundImage: `url(${category.logo}), url(${category.color})`,
            }} */
          ></div>
          <h2
            className={cl.category}
            style={{
              color: props.mode === 'dark' ? 'white' : 'black',
            }}
          >
            {/* {category.name} */}
          </h2>
          <div className={cl.price}>
            <h2 className={cl.price} style={{ color: x }}>
              {props.currency}
              {Number(props.operation.amount).toFixed(2)}
            </h2>
          </div>
        </div>
      </div>
      <div className={cl.lastBlock}>
        <div className={cl.change}>
          <button
            className={props.isTravel ? cl.changeTravel : cl.change}
            onClick={() => {
              if (!props.isTravel) sayThatIsChange()
            }}
            style={{
              background: props.mode === 'dark' ? '#e5e5e5' : '#54626d',
            }}
          >
            <h1
              style={{
                color: props.mode === 'dark' ? '#333' : '#f0f8ff',
              }}
            >
              {t('change')}
            </h1>
          </button>
        </div>
        <div
          className={cl.delete}
          onClick={() => {
            if (!props.isTravel) check(props.operation.id)
          }}
        >
          <CloseButton isTravel={props.isTravel} />
        </div>
      </div>
    </div>
  )
}

export default NewOperation
