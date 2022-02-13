import React, { useState } from 'react'
import cl from './CategorySettings.module.css'
import RadioColor from '../../ReusedElements/RadioColor/RadioColor'
import RadioLogo from '../../ReusedElements/RadioLogo/RadioLogo'
import CloseButton from '../../ReusedElements/CloseButton/CloseButton'
import { useTranslation } from 'react-i18next'
import BackButton from '../../ReusedElements/BackButton/BackButton'

const CategoriesSettings = (props) => {
  const { t } = useTranslation()

  let n = 0
  let logoNum = 0

  const setPage = (page, sign) => {
    if (page === 4) {
      n = 4
      props.setLogoPageNum(4)
    } else if (sign === '-') {
      n = props.logoPageNum - 1
      props.setLogoPageNum(n)
    }
    if (page === 0) {
      n = 0
      props.setLogoPageNum(0)
    } else if (sign === '+') {
      n = props.logoPageNum + 1
      props.setLogoPageNum(n)
    }
    let x = props.logos.indexOf(props.logo)
    if (x >= 8) {
      x = x % 8
    }
    logoNum = x + 8 * n
    props.setLogo(props.logos[logoNum])
  }

  return (
    <div>
      <div className={cl.cattName}>
        <h1
          className={cl.nameOfCatSet}
          style={{
            color: props.mode === 'dark' ? '#f0f8ff' : 'black',
          }}
        >
          {t('name')}
        </h1>
        <div
          className={cl.wrapForBackBtn}
          onClick={() => {
            props.setCatSet(false)
            props.setSelectedCatId(-1)
            document.getElementById('selectedCategoryId').placeholder = ''
          }}
        >
          <BackButton />
        </div>
        <input
          className={cl.inputForCatName}
          value={props.category}
          onChange={(e) => {
            props.setCategory(e.target.value)
            e.target.placeholder = ''
          }}
          id="selectedCategoryId"
        ></input>
      </div>
      <div className={cl.cattColor}>
        <h1
          className={cl.nameOfCatSet}
          style={{
            color: props.mode === 'dark' ? '#f0f8ff' : 'black',
          }}
        >
          {t('background_color')}
        </h1>
        <div className={cl.wrapForColors}>
          <div className={cl.lines}>
            <RadioColor
              backColor={props.colors[0]}
              isFirstElement={true}
              color={props.color}
              setColor={props.setColor}
              colors={props.colors}
            />
            <RadioColor
              backColor={props.colors[1]}
              color={props.color}
              setColor={props.setColor}
              colors={props.colors}
            />
            <RadioColor
              backColor={props.colors[2]}
              color={props.color}
              setColor={props.setColor}
              colors={props.colors}
            />
            <RadioColor
              backColor={props.colors[3]}
              color={props.color}
              setColor={props.setColor}
              colors={props.colors}
            />
            <RadioColor
              backColor={props.colors[4]}
              color={props.color}
              setColor={props.setColor}
              colors={props.colors}
            />
          </div>
          <div className={cl.lines}>
            <RadioColor
              backColor={props.colors[5]}
              color={props.color}
              setColor={props.setColor}
              colors={props.colors}
            />
            <RadioColor
              backColor={props.colors[6]}
              color={props.color}
              setColor={props.setColor}
              colors={props.colors}
            />
            <RadioColor
              backColor={props.colors[7]}
              color={props.color}
              setColor={props.setColor}
              colors={props.colors}
            />
            <RadioColor
              backColor={props.colors[8]}
              color={props.color}
              setColor={props.setColor}
              colors={props.colors}
            />
            <RadioColor
              backColor={props.colors[9]}
              color={props.color}
              setColor={props.setColor}
              colors={props.colors}
            />
          </div>
        </div>
      </div>

      <div className={cl.cattLogo}>
        <h1
          className={cl.nameOfCatSet}
          style={{
            color: props.mode === 'dark' ? '#f0f8ff' : 'black',
          }}
        >
          {t('logo')}
        </h1>
        <div className={cl.wrapForBackLog}>
          <div className={cl.leftArrow}>
            <div
              className={cl.arr1}
              onClick={() => {
                props.logoPageNum === 0 ? setPage(4, '-') : setPage(1, '-')
              }}
            ></div>
            <div
              className={cl.arr2}
              onClick={() => {
                props.logoPageNum === 0 ? setPage(4, '-') : setPage(1, '-')
              }}
            ></div>
          </div>
          <div className={cl.wrapForLogos}>
            <div className={cl.lines}>
              <RadioLogo
                arrOfLogo={[
                  props.logos[0],
                  props.logos[8],
                  props.logos[16],
                  props.logos[24],
                  props.logos[32],
                ]}
                color={props.color}
                logoPageNum={props.logoPageNum}
                isFirstElement={true}
                logo={props.logo}
                setLogo={props.setLogo}
              />
              <RadioLogo
                arrOfLogo={[
                  props.logos[1],
                  props.logos[9],
                  props.logos[17],
                  props.logos[25],
                  props.logos[33],
                ]}
                color={props.color}
                logoPageNum={props.logoPageNum}
                logo={props.logo}
                setLogo={props.setLogo}
              />
              <RadioLogo
                arrOfLogo={[
                  props.logos[2],
                  props.logos[10],
                  props.logos[18],
                  props.logos[26],
                  props.logos[34],
                ]}
                color={props.color}
                logoPageNum={props.logoPageNum}
                logo={props.logo}
                setLogo={props.setLogo}
              />
              <RadioLogo
                arrOfLogo={[
                  props.logos[3],
                  props.logos[11],
                  props.logos[19],
                  props.logos[27],
                  props.logos[35],
                ]}
                color={props.color}
                logoPageNum={props.logoPageNum}
                logo={props.logo}
                setLogo={props.setLogo}
              />
            </div>
            <div className={cl.lines}>
              <RadioLogo
                arrOfLogo={[
                  props.logos[4],
                  props.logos[12],
                  props.logos[20],
                  props.logos[28],
                  props.logos[36],
                ]}
                color={props.color}
                logoPageNum={props.logoPageNum}
                logo={props.logo}
                setLogo={props.setLogo}
              />
              <RadioLogo
                arrOfLogo={[
                  props.logos[5],
                  props.logos[13],
                  props.logos[21],
                  props.logos[29],
                  props.logos[37],
                ]}
                color={props.color}
                logoPageNum={props.logoPageNum}
                logo={props.logo}
                setLogo={props.setLogo}
              />
              <RadioLogo
                arrOfLogo={[
                  props.logos[6],
                  props.logos[14],
                  props.logos[22],
                  props.logos[30],
                  props.logos[38],
                ]}
                color={props.color}
                logoPageNum={props.logoPageNum}
                logo={props.logo}
                setLogo={props.setLogo}
              />
              <RadioLogo
                arrOfLogo={[
                  props.logos[7],
                  props.logos[15],
                  props.logos[23],
                  props.logos[31],
                  props.logos[39],
                ]}
                color={props.color}
                logoPageNum={props.logoPageNum}
                logo={props.logo}
                setLogo={props.setLogo}
              />
            </div>
          </div>
          <div className={cl.rightArrow}>
            <div
              className={cl.arr1}
              onClick={() => {
                props.logoPageNum === 4 ? setPage(0, '+') : setPage(1, '+')
              }}
            ></div>
            <div
              className={cl.arr2}
              onClick={() => {
                props.logoPageNum === 4 ? setPage(0, '+') : setPage(1, '+')
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoriesSettings
