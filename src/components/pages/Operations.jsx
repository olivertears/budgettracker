import React, { useMemo, useState } from 'react'
import AddOperation from '../UI/OperationsOnly/AddOperation/AddOperation'
import OperationList from '../UI/OperationsOnly/OperationList'
import OperationCalc from '../UI/OperationsOnly/OperationCalc/OperationCalc'
import '../../styles/App.css'

const Operations = (props) => {
  const [changeOppId, setChangeOppId] = useState('')

  return (
    <div
      className="App"
      style={{ background: props.mode === 'dark' ? '#333' : '#c4c4c4' }}
    >
      <OperationCalc
        dateStart={props.dateStart}
        dateEnd={props.dateEnd}
        setDateStart={props.setDateStart}
        setDateEnd={props.setDateEnd}
        changeDate={props.changeDate}
        filteredOperations={props.filteredOperations}
        allCategories={props.allCategories}
        currency={props.currency}
      />
      <OperationList
        filteredOperations={props.filteredOperations}
        allOperations={props.allOperations}
        changeAllOperations={props.changeAllOperations}
        allCategories={props.allCategories}
        setVisible={props.setVisible}
        setChangeOppId={setChangeOppId}
        setDate={props.setDate}
        setAmount={props.setAmount}
        setCategory={props.setCategory}
        setSection={props.setSection}
        showCat={props.showCat}
        mode={props.mode}
        currency={props.currency}
        token={props.token}
        userId={props.userId}
        isTravel={props.isTravel}
      />
      <AddOperation
        visible={props.visible}
        setVisible={props.setVisible}
        allOperations={props.allOperations}
        changeAllOperations={props.changeAllOperations}
        section={props.section}
        setSection={props.setSection}
        date={props.date}
        setDate={props.setDate}
        amount={props.amount}
        setAmount={props.setAmount}
        section={props.section}
        setSection={props.setSection}
        showCat={props.showCat}
        category={props.category}
        setCategory={props.setCategory}
        changeOppId={changeOppId}
        setChangeOppId={setChangeOppId}
        allCategories={props.allCategories}
        mode={props.mode}
        token={props.token}
        userId={props.userId}
      />
    </div>
  )
}

export default Operations
