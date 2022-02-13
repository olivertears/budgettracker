import React, { useState } from 'react'
import cl from './Navbar.module.css'
import imgOperations from './img/operations.png'
import imgReport from './img/report.png'
import imgPlus from './img/plus.png'
import imgCategories from './img/categories.png'
import imgSettings from './img/settings.png'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Navbar = (props) => {
  const { t } = useTranslation()

  return (
    <div className={cl.wrap}>
      <div className={cl.content}>
        <div className={cl.oneItem}>
          <Link to="/operations">
            <img
              src={imgOperations}
              className={cl}
              onClick={() =>
                localStorage.setItem(
                  'lastVisited',
                  JSON.stringify('/operations')
                )
              }
            />
          </Link>
          <h5 className={cl.operations}>{t('operations')}</h5>
        </div>
        <div className={cl.oneItem}>
          <Link to="/report">
            <img
              src={imgReport}
              className={cl}
              onClick={() =>
                localStorage.setItem('lastVisited', JSON.stringify('/report'))
              }
            />
          </Link>
          <h5 className={cl.report}>{t('report')}</h5>
        </div>
        <div>
          <img
            src={imgPlus}
            className={cl.add}
            onClick={() => {
              props.setVisible(true)
              props.showCat(props.section)
            }}
          />
        </div>
        <div className={cl.oneItem}>
          <Link to="/categories">
            <img
              src={imgCategories}
              className={cl.afterAdd}
              onClick={() =>
                localStorage.setItem(
                  'lastVisited',
                  JSON.stringify('/categories')
                )
              }
            />
          </Link>
          <h5 className={cl.categories}>{t('categories')} </h5>
        </div>
        <div className={cl.oneItem}>
          <Link to="/settings">
            <img
              src={imgSettings}
              className={cl}
              onClick={() =>
                localStorage.setItem('lastVisited', JSON.stringify('/settings'))
              }
            />
          </Link>
          <h5 className={cl.settings}>{t('settings')}</h5>
        </div>
      </div>
    </div>
  )
}

export default Navbar
