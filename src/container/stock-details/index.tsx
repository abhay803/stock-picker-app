import React, { useEffect, useState, useRef } from 'react'

import { BasePagination, NoResult, BaseLoader } from '../../components'
import { BASE_URL, overviewOptions } from '../constant'
import { getRequest } from '../../utils/axios-util'

import { IStockDetails } from './interface'
import { STOCK_DETAILS_KEY, mock } from './constant'
import './style.scss'

const DetailsMap: any = {} // Component level caching

const StockDetails: React.FC<IStockDetails> = ({ stockQuery }) => {
  const [stockData, setStockData] = useState(new Object() as any)
  const [isLoad, setIsLoad] = useState(false)
  const [isError, setIsError] = useState(false)
  const [currIdx, setCurrIdx] = useState(-1)
  const [range, setRange] = useState(0)
  const detailsStack = useRef(new Array())

  const getStockDetails = () => {
    if (!stockQuery) return // page load

    if (DetailsMap[stockQuery]) {
      setStockData(DetailsMap[stockQuery])
      return
    }

    overviewOptions.params.symbol = stockQuery
    setIsLoad(true)
    setIsError(false)
    getRequest(BASE_URL, overviewOptions).then(
      (res) => {
        try {
          const { data } = res
          if (res.data['Information']) throw new Error('New API is required')

          if (Object.keys(data).length > 0) {
            setStockData(data)
            DetailsMap[stockQuery] = data
            detailsStack.current.push(stockQuery)
            setIsLoad(false)
          } else {
            setIsLoad(false)
          }
        } catch (err) {
          console.error('Overview API response is missing contract', err)
          setIsError(true)
          setIsLoad(false)
        }
      },
      (err) => {
        console.error('Overview API error response', err)
        setIsError(true)
        setIsLoad(false)
      }
    )
  }

  useEffect(getStockDetails, [stockQuery])

  useEffect(() => {
    const len = detailsStack.current.length - 1
    setCurrIdx(len)
    setRange(len)
  }, [detailsStack.current.length])

  useEffect(() => {
    setStockData(DetailsMap[detailsStack.current[currIdx]])
  }, [currIdx])

  const paginationClickHandler = (type: string) => {
    if (type === 'left') {
      setCurrIdx(currIdx - 1)
    }

    if (type === 'right') {
      setCurrIdx(currIdx + 1)
    }
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
      <BasePagination
        current={currIdx}
        range={range}
        clickHandler={paginationClickHandler}
      />
      {isLoad && (
        <div className="loader-main">
          <BaseLoader height="60vh" width="60vh" />
        </div>
      )}
      {!isLoad && detailsStack.current.length < 1 && (
        <p className="no-history">No search history !!!</p>
      )}
      {!isLoad && detailsStack.current.length > 0 && stockDetailView()}
      {/* {isError && <NoResult message="Stock details not found" />} */}
    </div>
  )
}

export default StockDetails
