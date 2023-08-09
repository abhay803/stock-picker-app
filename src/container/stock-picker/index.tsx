import React, { useState, useCallback, useEffect } from 'react'
import debounce from 'lodash.debounce'

import {
  BaseInput,
  BaseButton,
  BaseList,
  BaseLoader,
  NoResult,
} from '../../components/'
import { getRequest } from '../../utils/axios-util'
import { BASE_URL, DEBOUNCE_TIME, searchOptions } from '../constant'

import { IStockPicker } from './interface'
import './style.scss'

const StockPicker: React.FC<IStockPicker> = ({ clickHandler }) => {
  const [searchTxt, setSearchTxt] = useState('')
  const [list, setList] = useState([])
  const [isLoad, setIsLoad] = useState(false)
  const [isError, setIsError] = useState(false)

  const PickerMap: any = {}

  const debounceChangeHandler = useCallback(
    debounce((inputTxt: string) => {
      if (!inputTxt) {
        //TODO: set no content found
        setList([])
        return
      }

      if (PickerMap[searchTxt]) {
        setList(PickerMap[searchTxt])
        return
      }

      searchOptions.params.keywords = inputTxt
      setIsLoad(true)
      setIsError(false)
      getRequest(BASE_URL, searchOptions).then(
        (res) => {
          try {
            if (res.data['Information']) throw new Error('New API is required')

            const tempList = res.data?.bestMatches.map(
              (item: any) => item['1. symbol']
            )

            setList(tempList)
            PickerMap[searchTxt] = tempList
            setIsLoad(false)
          } catch (err) {
            console.error('Picker API Response is missing contract', err)
            setIsError(true)
            setIsLoad(false)
          }
        },
        (err) => {
          console.error('Picker API Error Response', err)
          setIsError(true)
          setIsLoad(false)
        }
      )
    }, DEBOUNCE_TIME),
    []
  )

  const getListView = () => {
    return (
      <ul className="list">
        {list.map((item, idx) => (
          <BaseList keyName={idx} keyVal={item} />
        ))}
      </ul>
    )
  }

  const itemClickHandler = (e: any) => {
    setSearchTxt('')
    setList([])
    const symbolTxt = e.target.innerText
    clickHandler(symbolTxt)
  }

  const getNoResult = () => {
    return <p className="no-result">No Results found !!!</p>
  }

  return (
    <div className="sd-main">
      <div className="sd-search">
        <BaseInput
          name="Stock Name"
          placeholderText="Enter Stock Name"
          value={searchTxt}
          onChange={(e: any) => {
            const { value } = e.target
            setSearchTxt(value)
            debounceChangeHandler(value)
          }}
        />
        {isLoad ? (
          <div className="sd-search">
            <BaseLoader />
          </div>
        ) : (
          <div
            className="sd-search"
            onClick={() => {
              console.log('Search Button api call ...')
              return debounceChangeHandler
            }}
          >
            <BaseButton btnName="Search" />
          </div>
        )}
      </div>
      {isError && <NoResult message="Stock not found " />}
      {isLoad && null}
      {!!list.length && (
        <div className="list-content" onClick={itemClickHandler}>
          {getListView()}
        </div>
      )}
    </div>
  )
}

export default StockPicker
