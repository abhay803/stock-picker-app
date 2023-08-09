import React, { useEffect, useState } from 'react'

import { BasePagination } from '../../components'
import { BASE_URL, overviewOptions } from '../constant'
import { getRequest } from '../../utils/axios-util'

import { IStockDetails } from './interface'
import { STOCK_DETAILS_KEY, mock } from './constant'
import './style.scss'

const StockDetails: React.FC<IStockDetails> = ({ stockQuery }) => {
  const [stockData, setStockData] = useState(mock)
  const [isLoad, setIsLoad] = useState(true)

  const DetailsMap: any = {} // Component level caching

  const getStockDetails = () => {
    if (!stockQuery) return // page load

    if (DetailsMap[stockQuery]) {
      setStockData(DetailsMap[stockQuery])
      return
    }

    overviewOptions.params.symbol = stockQuery
    setIsLoad(true)
    getRequest(BASE_URL, overviewOptions).then(
      (res) => {
        const { data } = res
        if (Object.keys(data).length > 0) {
          setStockData(data)
          DetailsMap[stockQuery] = data
          setIsLoad(false)
        }
      },
      (err) => console.error(err)
    )
  }

  useEffect(getStockDetails, [stockQuery])

  const getNoResult = () => {
    return <p className="no-result">No Results found !!!</p>
  }

  const stockDetailView = () => {
    return (
      <>
        <h3 className="desc-title">Stock Details</h3>
        <div className="info-bar">
          <div className="info-box">
            <span className="info-name">{STOCK_DETAILS_KEY.name}</span>
            <span className="info-value">{stockData['Name']}</span>
          </div>
          <div className="info-box">
            <span className="info-name">{STOCK_DETAILS_KEY.symbol}</span>
            <span className="info-value">{stockData['Symbol']}</span>
          </div>
          <div className="info-box">
            <span className="info-name">{STOCK_DETAILS_KEY.industry}</span>
            <span className="info-value">{stockData['Industry']}</span>
          </div>
          <div className="info-box">
            <span className="info-name">{STOCK_DETAILS_KEY.marketCap}</span>
            <span className="info-value">
              {stockData['MarketCapitalization']}
            </span>
          </div>
          <div className="info-box">
            <span className="info-name">{STOCK_DETAILS_KEY.price}</span>
            <span className="info-value">
              {stockData['AnalystTargetPrice']}
            </span>
          </div>
          <div className="info-box">
            <span className="info-name">{STOCK_DETAILS_KEY.peRatio}</span>
            <span className="info-value">{stockData['PERatio']}</span>
          </div>
        </div>
        <section className="info-content">
          <span className="info-name">{STOCK_DETAILS_KEY.desc}</span>
          <p className="info-value">{stockData['Description']}</p>
        </section>
      </>
    )
  }

  return (
    <div className="stock-details">
      <BasePagination left={false} right={true} />
      {!isLoad ? stockDetailView() : getNoResult()}
    </div>
  )
}

export default StockDetails
