import React, { useEffect } from 'react'
import cl from './CategoryItem.module.css'
import open from './EyeImg/Open.png'
import close from './EyeImg/Close.png'

const CategoryItem = (props) => {
  useEffect(() => {
    let wrap = document.getElementsByName('wrapForAllTheCat')
    let div = document.getElementsByName('eyeToHide')
    for (let y in props.filteredCategories) {
      for (let i in props.arrToHide) {
        if (props.filteredCategories[y].name === props.arrToHide[i]) {
          div[y].style.backgroundImage = `url(${close})`
          props.mode === 'dark'
            ? (wrap[y].style.background = 'rgba(0, 0, 0, 0.3)')
            : (wrap[y].style.background = 'rgba(84, 98, 109, 0.7)')
        }
      }
    }
  }, [])

  const hideCatFromChart = () => {
    let idx = props.filteredCategories.findIndex(
      (cat) => cat.name === props.category.name
    )
    let hideIdx = props.arrToHide.findIndex(
      (name) => name === props.category.name
    )
    let wrap = document.getElementsByName('wrapForAllTheCat')
    let div = document.getElementsByName('eyeToHide')
    if (hideIdx === -1) {
      div[idx].style.backgroundImage = `url(${close})`
      props.mode === 'dark'
        ? (wrap[idx].style.background = 'rgba(0, 0, 0, 0.5)')
        : (wrap[idx].style.background = 'rgba(84, 98, 109, 0.7)')
      props.setCatToHide(props.category.name)
    } else {
      div[idx].style.backgroundImage = `url(${open})`
      props.mode === 'dark'
        ? (wrap[idx].style.background = '#333')
        : (wrap[idx].style.background = '#c4c4c4')
      props.setCatToHide(props.category.name)
    }
  }

  let fullAmount = 0
  for (let i in props.filteredOperations) {
    if (props.category.name === props.filteredOperations[i].categoryName) {
      fullAmount += +props.filteredOperations[i].amount
    }
  }

  return (
    <div
      className={cl.wrapForLCatItem}
      name="wrapForAllTheCat"
      style={{ background: props.mode === 'dark' ? '#333' : '#c4c4c4' }}
    >
      <div className={cl.logoAndColor}>
        <div
          className={cl.logoAndColorImg}
          style={{
            backgroundImage: `url(${props.category.logo}), url(${props.category.color})`,
            outlineColor: props.mode === 'dark' ? '#e5e5e5' : 'black',
          }}
        ></div>
      </div>
      <div
        className={cl.groupCatElements}
        style={{
          borderColor: props.mode === 'dark' ? '#e5e5e5' : '#54626d',
        }}
      >
        <div className={cl.textOfTheCat}>
          <h2
            className={cl.txtforcategoryname}
            style={{
              color: props.mode === 'dark' ? '#e5e5e5' : 'black',
            }}
          >
            {props.category.name}
          </h2>
        </div>
        <div className={cl.textOfTheAmount}>
          <h2
            name="reportAmount"
            className={cl.txtforcategoryamount}
            style={{
              color: props.mode === 'dark' ? '#e5e5e5' : 'black',
            }}
          >
            {props.currency}
            {fullAmount.toString().length > 8
              ? fullAmount.toExponential(3)
              : fullAmount.toFixed(2)}
          </h2>
        </div>
        <div className={cl.wrapForHideCat}>
          <div
            name="eyeToHide"
            className={cl.hideCatFromChart}
            style={{ backgroundImage: `url(${open})` }}
            onClick={() => hideCatFromChart()}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default CategoryItem
