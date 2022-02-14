import React, { useMemo, useEffect, useState } from 'react'
import OneAdmin from '../OneAdmin/OneAdmin'
import OneUser from '../OneUser/OneUser'
import cl from './SettingsAllUsers.module.css'
import { useTranslation } from 'react-i18next'

const SettingsAllUsers = (props) => {
  const { t } = useTranslation()

  const [selectOpen, setSelectOpen] = useState(false)
  const [sort, setSort] = useState(t('sort_nick'))
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (sort === 'role' || sort === 'роли') {
      setSort(t('sort_role'))
    } else if (sort === 'nickname' || sort === 'никнейму') {
      setSort(t('sort_nick'))
    } else setSort(t('sort_date'))
  }, [props.language])

  useEffect(() => {
    selectOpen
      ? (document.getElementById('wrapForOptions').style.display = '')
      : (document.getElementById('wrapForOptions').style.display = 'none')
  }, [selectOpen])

  const filteredUsers = useMemo(() => {
    if (sort === 'role' || sort === 'роли') {
      props.allUsers.sort((a, b) => {
        if (a.role < b.role) {
          return -1
        }
        if (a.role > b.role) {
          return 1
        }
        return 0
      })
    } else if (sort === 'nickname' || sort === 'никнейму') {
      props.allUsers.sort((a, b) => {
        if (a.nickname < b.nickname) {
          return -1
        }
        if (a.nickname > b.nickname) {
          return 1
        }
        return 0
      })
    } else
      props.allUsers.sort((a, b) => {
        if (a.createdDate < b.createdDate) {
          return -1
        }
        if (a.createdDate > b.createdDate) {
          return 1
        }
        return 0
      })

    return props.allUsers.filter((user) =>
      user.nickname.toLowerCase().startsWith(inputValue.toLowerCase())
    )
  }, [sort, inputValue, props.allUsers])

  return (
    <div
      className={cl.curOn}
      style={{
        display: props.checkUsers,
        background: props.mode === 'dark' ? '#333' : '#c4c4c4',
      }}
    >
      <input
        className={cl.input}
        value={inputValue}
        placeholder={t('filter')}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <div className={cl.selectWrap}>
        <div
          className={cl.select}
          onClick={() =>
            selectOpen ? setSelectOpen(false) : setSelectOpen(true)
          }
        >
          <h2>
            {t('sort_by')}
            {sort}
          </h2>
          <div className={cl.arrow}>▼</div>
        </div>
        <div id="wrapForOptions">
          <div
            className={cl.option}
            onClick={() => {
              setSelectOpen(false)
              setSort(t('sort_nick'))
            }}
          >
            <h2>{t('sort_nick')}</h2>
          </div>
          <div
            className={cl.option}
            onClick={() => {
              setSelectOpen(false)
              setSort(t('sort_date'))
            }}
          >
            <h2>{t('sort_date')}</h2>
          </div>
          <div
            className={cl.option}
            onClick={() => {
              setSelectOpen(false)
              setSort(t('sort_role'))
            }}
          >
            <h2>{t('sort_role')}</h2>
          </div>
        </div>
      </div>
      {filteredUsers.map((user, idx) =>
        props.role === 'USER' ? (
          <OneUser user={user} idx={idx} key={user.id} userId={props.userId} />
        ) : (
          <OneAdmin
            user={user}
            idx={idx}
            key={user.id}
            setIsTravel={props.setIsTravel}
            token={props.token}
            userId={props.userId}
          />
        )
      )}
    </div>
  )
}

export default SettingsAllUsers
