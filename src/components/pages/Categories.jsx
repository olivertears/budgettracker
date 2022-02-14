import React from 'react'
import CategoriesList from '../UI/CategoriesOnly/CategoriesList/CategoriesList'
import AddOperation from '../UI/OperationsOnly/AddOperation/AddOperation'
import SectionChangeButton from '../UI/ReusedElements/SectionChangeButton/SectionChangeButton'

const Categories = (props) => {
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
      <CategoriesList
        allOperations={props.allOperations}
        allCategories={props.allCategories}
        changeAllCategories={props.changeAllCategories}
        section={props.section}
        setSection={props.setSection}
        category={props.category}
        setCategory={props.setCategory}
        logo={props.logo}
        setLogo={props.setLogo}
        color={props.color}
        setColor={props.setColor}
        logos={props.logos}
        colors={props.colors}
        filteredCategories={props.filteredCategories}
        changeAllOperations={props.changeAllOperations}
        mode={props.mode}
        confirmed={props.confirmed}
        setConfirmed={props.setConfirmed}
        userId={props.userId}
        token={props.token}
        isTravel={props.isTravel}
      />
    </div>
  )
}

export default Categories
