import React from 'react'
import NewOperation from './NewOperation/NewOperation'

const OperationList = (props) => {
  return (
    <div className="Operations">
      {props.filteredOperations.map((operation) => (
        <NewOperation
          allOperations={props.allOperations}
          operation={operation}
          key={operation.id}
          changeAllOperations={props.changeAllOperations}
          allCategories={props.allCategories}
          setVisible={props.setVisible}
          setChangeOppId={props.setChangeOppId}
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
      ))}
    </div>
  )
}

export default OperationList
