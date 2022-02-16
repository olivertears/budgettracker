import React from 'react'
import CalendarInput from '../CalendarInput/CalendarInput'
import cl from './OperationCalc.module.css'
import { useTranslation } from 'react-i18next'

const OperationCalc = (props) => {
  const { t } = useTranslation()

  let expense = 0
  let income = 0
  let res = 0
  let sign = ''

  for (let i in props.filteredOperations) {
    let category = props.allCategories.find(
      (cat) => cat.name === props.filteredOperations[i].categoryName
    )
    if (category.section === 'Expense') {
      expense += Number(props.filteredOperations[i].amount)
    } else income += Number(props.filteredOperations[i].amount)
  }

  expense = expense.toFixed(2)
  income = income.toFixed(2)
  res = Math.abs(income - expense).toFixed(2)
  if (expense > income) {
    sign = '-'
  }

  return (
    <div className={cl.wrap}>
      <div className={cl.calc}>
        <div className={cl.txt}>
          <h1 className={cl.txt}>{t('income')}</h1>
          <h1 className={cl.txt}>{t('expense')}</h1>
        </div>
        <div className={cl.numb}>
          <h1 className={cl.numbInc}>
            {props.currency}
            {income}
          </h1>
          <h1 className={cl.numbExp}>
            {props.currency}
            {expense}
          </h1>
          <h1 className={cl.numbRes}>
            {sign}
            {props.currency}
            {res}
          </h1>
        </div>
      </div>
      <div className={cl.date}>
        <CalendarInput
          dateStart={props.dateStart}
          dateEnd={props.dateEnd}
          setDateStart={props.setDateStart}
          setDateEnd={props.setDateEnd}
          changeDate={props.changeDate}
        />
      </div>
    </div>
  )
}

export default OperationCalc
