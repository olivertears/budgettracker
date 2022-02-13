import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpApi from 'i18next-http-backend'
import react from 'react'
import './styles/App.css'

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['en', 'ru'],
    fallbackLng: 'en',
    detection: {
      order: ['cookie', 'localStorage' /*'htmlTag' */],
      caches: ['cookie'],
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
  })

const loadingMarkup = (
  <div className="Loader">
    <div className="insideLoader"></div>
    <div className="insideLoader"></div>
  </div>
)

ReactDOM.render(
  <Suspense fallback={loadingMarkup}>
    <App />
  </Suspense>,
  document.getElementById('root')
)
