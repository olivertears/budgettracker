import React, { useState, useMemo, useEffect } from 'react'
import AddOperation from '../../OperationsOnly/AddOperation/AddOperation'
import CreateChangeBtn from '../../ReusedElements/CreateChangeBtn/CreateChangeBtn'
import CategorySettings from '../CategorySettings/CategorySettings'
import NewCategory from '../NewCategory/NewCategory'
import cl from './CategoriesList.module.css'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import NotConfirmed from '../NotConfirmed/NotConfirmed'

const CategoriesList = (props) => {
  const { t } = useTranslation()
  const API = axios.create({
    baseURL: `https://budgettrackerjsonholder.herokuapp.com/`,
  })
  const headers = {
    'Content-Type': 'application/json',
    Authorization: props.token,
  }

  const [logoPageNum, setLogoPageNum] = useState(0)
  const [catSet, setCatSet] = useState(false)
  const [selectedCatId, setSelectedCatId] = useState(-1)
  const [isWarning, setIsWarning] = useState('none')

  useEffect(() => {
    API.get(`api/users/${props.userId}/categories`).then((res) => {
      localStorage.setItem('allCategories', JSON.stringify(res.data))
    })
  }, [props.allCategories])

  let check = 'none'
  let btnTxt = `${t('add')}`
  if (catSet) {
    check = ''
    btnTxt = `${t('save')}`
  }

  const checkIsConfirmed = () => {
    API.get(`api/users/${props.userId}`).then((res) => {
      if (res.data.confirmed) {
        props.setConfirmed(res.data.confirmed)
        localStorage.setItem('confirmed', JSON.stringify(res.data.confirmed))
        addNewOrChangeCategory()
      } else {
        setIsWarning('')
      }
    })
  }

  const returnDefaultValues = () => {
    setCatSet(true)
    props.setCategory('')
    props.setColor(props.colors[0])
    props.setLogo(props.logos[0])
    setLogoPageNum(0)
    document.getElementById('customColorChecked').checked = true
    document.getElementById('customLogoChecked').checked = true
  }

  const addNewOrChangeCategory = () => {
    if (selectedCatId !== -1) {
      let idx = props.allCategories.findIndex((cat) => cat.id === selectedCatId)
      for (let i in props.allOperations) {
        if (
          props.allOperations[i].categoryName === props.allCategories[idx].name
        ) {
          props.allOperations[i].categoryName = props.category
        }
      }
      props.allCategories[idx].section = props.section
      props.allCategories[idx].name = props.category
      props.allCategories[idx].color = props.color
      props.allCategories[idx].logo = props.logo
      props.changeAllCategories([...props.allCategories])

      const newCategory = {
        userId: props.userId,
        id: selectedCatId,
        section: props.section,
        name: props.category,
        logo: props.logo,
        color: props.color,
      }

      API.put('api/categories', JSON.stringify(newCategory), { headers })
        .then((res) => setCatSet(false))
        .catch((err) => {
          console.log(err.response.data.message)
          props.setCategory('')
          if (err.response.data.message.includes('already exists')) {
            document.getElementById('selectedCategoryId').placeholder = `${t(
              'category_exist'
            )}`
          } else {
            document.getElementById('selectedCategoryId').placeholder = `${t(
              'one_symbol'
            )}`
          }
        })

      setSelectedCatId(-1)
    } else {
      const newCategory = {
        userId: props.userId,
        id: Date.now(),
        section: props.section,
        name: props.category,
        logo: props.logo,
        color: props.color,
      }

      const reloadCatId = async () => {
        try {
          const postNewCat = await API.post(
            'api/categories',
            JSON.stringify(newCategory),
            { headers }
          )

          const fullCat = await API.get(`api/users/${props.userId}/categories`)

          props.changeAllCategories(fullCat.data)
          setCatSet(false)
        } catch (err) {
          console.log(err.response.data.message)
          props.setCategory('')
          if (err.response.data.message.includes('already exists')) {
            document.getElementById('selectedCategoryId').placeholder = `${t(
              'category_exist'
            )}`
          } else {
            document.getElementById('selectedCategoryId').placeholder = `${t(
              'one_symbol'
            )}`
          }
        }
      }

      reloadCatId()
    }

    props.setCategory('')
    props.setColor(props.colors[0])
    props.setLogo(props.logos[0])
    setLogoPageNum(0)
  }

  return (
    <div>
      <div
        className={cl.wrapForCategories}
        style={{
          background: props.mode === 'dark' ? '#333' : '#c4c4c4',
        }}
      >
        <NotConfirmed isWarning={isWarning} setIsWarning={setIsWarning} />
        <div
          className={cl.categorySettings}
          style={{
            display: check,
            background: props.mode === 'dark' ? '#333' : '#c4c4c4',
          }}
        >
          <CategorySettings
            category={props.category}
            setCategory={props.setCategory}
            logo={props.logo}
            setLogo={props.setLogo}
            color={props.color}
            setColor={props.setColor}
            logos={props.logos}
            colors={props.colors}
            logoPageNum={logoPageNum}
            setLogoPageNum={setLogoPageNum}
            mode={props.mode}
            setCatSet={setCatSet}
            setSelectedCatId={setSelectedCatId}
          />
        </div>
        {props.filteredCategories.map((category) => (
          <NewCategory
            category={category}
            setCategory={props.setCategory}
            setColor={props.setColor}
            setLogo={props.setLogo}
            key={category.id}
            allCategories={props.allCategories}
            changeAllCategories={props.changeAllCategories}
            setCatSet={setCatSet}
            logos={props.logos}
            setLogoPageNum={setLogoPageNum}
            setSelectedCatId={setSelectedCatId}
            changeAllOperations={props.changeAllOperations}
            allOperations={props.allOperations}
            token={props.token}
            isTravel={props.isTravel}
          />
        ))}
      </div>
      <div
        className={cl.addCreateBtn}
        onClick={() => {
          if (props.confirmed) {
            catSet ? addNewOrChangeCategory() : returnDefaultValues()
          } else checkIsConfirmed()
        }}
      >
        <CreateChangeBtn btnTxt={btnTxt} isTravel={props.isTravel} />
      </div>
    </div>
  )
}

export default CategoriesList
