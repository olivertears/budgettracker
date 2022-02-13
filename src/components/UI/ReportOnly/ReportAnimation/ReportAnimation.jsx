import React, { useEffect } from 'react'
import cl from './ReportAnimation.module.css'
import * as echarts from 'echarts'
import { useTranslation } from 'react-i18next'

const ReportAnimation = (props) => {
  const { t } = useTranslation()

  const arrOfColors = [
    '#ffb7c2',
    '#ffff99',
    '#b5ffe6',
    '#deb6dd',
    '#9dff82',
    '#ff544b',
    '#ffb841',
    '#5ab5ff',
    '#946e9d',
    '#4fa94a',
  ]

  const calculateFullAmount = (catName) => {
    let fullAmount = 0
    for (let i in props.filteredOperations) {
      if (props.filteredOperations[i].categoryName === catName) {
        fullAmount += props.filteredOperations[i].amount
      }
    }
    return fullAmount
  }

  const findColor = (interestedColor) => {
    let color = ''
    for (let i in props.colors) {
      if (props.colors[i] === interestedColor) {
        color = arrOfColors[i]
      }
    }
    return color
  }

  const createOption = () => {
    props.filteredCatForReport.length === 0
      ? (option.title.text = `${t('no_categories')}`)
      : (option.title.text = '')

    let dataItem = {}
    for (let i in props.filteredCatForReport) {
      let value = calculateFullAmount(props.filteredCatForReport[i].name)
      let color = findColor(props.filteredCatForReport[i].color)
      dataItem = {
        value: value,
        name: props.filteredCatForReport[i].name,
        label: {
          formatter: ['{Logo|}'].join('\n'),
          backgroundColor: {
            image: props.filteredCatForReport[i].color,
          },
          rich: {
            Logo: {
              width: 40,
              height: 40,
              borderWidth: 1,
              borderColor: props.mode === 'dark' ? '#fff' : '#000',
              borderRadius: 20,
              backgroundColor: {
                image: props.filteredCatForReport[i].logo,
              },
            },
          },
        },
        itemStyle: {
          color: color,
        },
      }
      option.series[0].data.push(dataItem)
    }
  }

  let option = {
    title: {
      left: 'center',
      top: '5',
      textStyle: {
        color: props.mode === 'dark' ? 'white' : 'black',
      },
    },
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        name:
          props.section === 'Expense' ? `${t('expense')}` : `${t('income')}`,
        type: 'pie',
        radius: ['40%', '70%'],
        itemStyle: {
          borderRadius: 10,
          borderColor: props.mode === 'dark' ? '#fff' : '#000',
          borderWidth: 2,
        },
        labelLine: {
          lineStyle: {
            color: props.mode === 'dark' ? '#fff' : '#000',
          },
          smooth: 0.2,
          length: 10,
          length2: 20,
        },
        data: [],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }

  useEffect(() => {
    var myChart = echarts.init(document.getElementById('main'), 'light')
    createOption()
    myChart.setOption(option)
  }, [props.section, props.filteredCatForReport, props.filteredOperations])

  return (
    <div className={cl.wrapForAnimation} id="main">
      <div></div>
    </div>
  )
}

export default ReportAnimation
