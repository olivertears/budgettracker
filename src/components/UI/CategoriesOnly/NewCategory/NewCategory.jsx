import React from 'react'
import CloseButton from '../../ReusedElements/CloseButton/CloseButton'
import cl from './NewCategory.module.css'
import axios from 'axios'

const NewCategory = (props) => {
  const API = axios.create({
    baseURL: `https://budgettrackerjsonholder.herokuapp.com/`,
  })
  const headers = {
    'Content-Type': 'application/json',
    Authorization: props.token,
  }

  const check = (nameOfOpp) => {
    API.delete(`api/categories/${props.category.id}`, {
      headers,
    })
      .then((res) => {
        let refilteredOperations = props.allOperations.filter(
          (opp) => opp.categoryName !== nameOfOpp
        )
        props.changeAllOperations([...refilteredOperations])
        let index = props.allCategories.findIndex(
          (cat) => cat.name === nameOfOpp
        )
        props.allCategories.splice(index, 1)
        props.changeAllCategories([...props.allCategories])
      })
      .catch((err) => {
        console.log(err.response.data.message)
      })
  }

  const changeCategorySettings = () => {
    props.setSelectedCatId(props.category.id)
    props.setCatSet(true)
    props.setCategory(props.category.name)
    props.setColor(props.category.color)
    props.setLogo(props.category.logo)
    props.setLogoPageNum(
      Math.floor(props.logos.indexOf(props.category.logo) / 8)
    )

    let colorArr = document.getElementsByName('radioColor')
    for (let i in colorArr) {
      if (props.category.color === colorArr[i].value) {
        colorArr[i].checked = true
      }
    }

    let logoArr = document.getElementsByName('radioLogo')
    logoArr[props.logos.indexOf(props.category.logo) % 8].checked = true
  }

  return (
    <div className={props.isTravel ? cl.newCategoryTravel : cl.newCategory}>
      <div
        className={cl.wrapToChange}
        onClick={() => {
          if (!props.isTravel) changeCategorySettings()
        }}
      >
        <div
          className={cl.wrapForLogo}
          style={{
            backgroundImage: `url(${props.category.logo}), url(${props.category.color})`,
          }}
        ></div>
        <div className={cl.wrapForCategoryName}>
          <h1 className={cl.categoryName}>{props.category.name}</h1>
        </div>
      </div>
      <div
        className={cl.wrapForClBtn}
        onClick={() => {
          if (!props.isTravel) check(props.category.name)
        }}
      >
        <CloseButton isTravel={props.isTravel} />
      </div>
    </div>
  )
}

export default NewCategory
