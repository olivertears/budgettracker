import React from 'react'
import cl from './TravelBackBtn.module.css'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const TravelBackBtn = ({ setIsTravel }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  return (
    <div
      className={cl.backFromTravel}
      onClick={() => {
        localStorage.setItem('isTravel', JSON.stringify(false))
        localStorage.setItem('lastVisited', JSON.stringify('/settings'))
        setIsTravel(false)
        navigate('/settings')
      }}
    >
      <h6 className={cl.backTxt}>{t('back')}</h6>
    </div>
  )
}

export default TravelBackBtn
