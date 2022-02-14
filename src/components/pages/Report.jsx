import React from 'react'
import AddOperation from '../UI/OperationsOnly/AddOperation/AddOperation'
import ReportAnimation from '../UI/ReportOnly/ReportAnimation/ReportAnimation'
import ReportList from '../UI/ReportOnly/ReportList/ReportList'
import SectionChangeButton from '../UI/ReusedElements/SectionChangeButton/SectionChangeButton'

const Report = (props) => {
  let check = ''
  if (!props.visible) {
    check = 'none'
  }

  return (
    <div
      className="App"
      style={{ background: props.mode === 'dark' ? '#333' : '#c4c4c4' }}
    >
      <div style={{ display: check }}>
        <AddOperation
          visible={props.visible}
          setVisible={props.setVisible}
          allOperations={props.allOperations}
          changeAllOperations={props.changeAllOperations}
          date={props.date}
          setDate={props.setDate}
          amount={props.amount}
          setAmount={props.setAmount}
          section={props.section}
          setSection={props.setSection}
          filteredCategories={props.filteredCategories}
          showCat={props.showCat}
          category={props.category}
          setCategory={props.setCategory}
          mode={props.mode}
          token={props.token}
          userId={props.userId}
        />
      </div>
      <SectionChangeButton
        section={props.section}
        setSection={props.setSection}
      />
      <ReportAnimation
        colors={props.colors}
        filteredCatForReport={props.filteredCatForReport}
        section={props.section}
        filteredOperations={props.filteredOperations}
        mode={props.mode}
        currency={props.currency}
      />
      <ReportList
        filteredCategories={props.filteredCategories}
        filteredOperations={props.filteredOperations}
        setCatToHide={props.setCatToHide}
        filteredCatForReport={props.filteredCatForReport}
        arrToHide={props.arrToHide}
        setArrToHide={props.setArrToHide}
        mode={props.mode}
        currency={props.currency}
      />
    </div>
  )
}

export default Report
