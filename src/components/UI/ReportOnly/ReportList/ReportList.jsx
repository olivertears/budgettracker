import React from 'react'
import CategoryItem from '../CategoryItem/CategoryItem'
import cl from './ReportList.module.css'

const ReportList = (props) => {
  return (
    <div
      className={cl.wrapForList}
      style={{
        background: props.mode === 'dark' ? '#333' : '#c4c4c4',
        borderColor: props.mode === 'dark' ? '#e5e5e5' : '#54626d',
      }}
    >
      {props.filteredCategories.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          filteredCategories={props.filteredCategories}
          filteredOperations={props.filteredOperations}
          setCatToHide={props.setCatToHide}
          arrToHide={props.arrToHide}
          setArrToHide={props.setArrToHide}
          mode={props.mode}
          currency={props.currency}
        />
      ))}
    </div>
  )
}

export default ReportList
