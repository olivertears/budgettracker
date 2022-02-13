import React from 'react'
import AddOperation from '../UI/OperationsOnly/AddOperation/AddOperation'
import SettingsControl from '../UI/SettingsOnly/SettingsControl/SettingsControl'

const Settings = (props) => {
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
      <SettingsControl
        language={props.language}
        setLanguage={props.setLanguage}
        mode={props.mode}
        setMode={props.setMode}
        currency={props.currency}
        setCurrency={props.setCurrency}
        setIsAuth={props.setIsAuth}
        email={props.email}
        createdDate={props.createdDate}
        nickname={props.nickname}
        role={props.role}
        setRole={props.setRole}
        confirmed={props.confirmed}
        allUsers={props.allUsers}
        setIsTravel={props.setIsTravel}
        auth={props.auth}
        token={props.token}
        changeAllUsers={props.changeAllUsers}
        userId={props.userId}
        setNickname={props.setNickname}
      />
    </div>
  )
}

export default Settings
