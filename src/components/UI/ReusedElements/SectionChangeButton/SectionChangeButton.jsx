import React from 'react'
import { useState } from 'react/cjs/react.development'
import cl from './SectionChangeButton.module.css'
import { useTranslation } from 'react-i18next'

const SectionChangeButton = (props) => {
  const { t } = useTranslation()

  let b1 = ''
  let b2 = ''
  let c1 = ''
  let c2 = ''
  if (props.section === 'Expense') {
    b1 = '#54626D'
    c1 = '#f0f8ff'
  } else if (props.section === 'Income') {
    b2 = '#54626D'
    c2 = '#f0f8ff'
  }
  return (
    <div className={cl.sectionChangeButtonWrap}>
      <div
        className={cl.section}
        onClick={() => {
          props.setSection('Expense')
          localStorage.setItem('section', JSON.stringify('Expense'))
        }}
        style={{ background: b1 }}
      >
        <h1 className={cl.changeSection} style={{ color: c1 }}>
          {t('expense')}
        </h1>
      </div>
      <div
        className={cl.section}
        onClick={() => {
          props.setSection('Income')
          localStorage.setItem('section', JSON.stringify('Income'))
        }}
        style={{ background: b2 }}
      >
        <h1 className={cl.changeSection} style={{ color: c2 }}>
          {t('income')}
        </h1>
      </div>
    </div>
  )
}

export default SectionChangeButton
