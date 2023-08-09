import React, { useState, useEffect } from 'react'

import { StockPicker, StockDetails } from '../container'

const StockWidget: React.FC<{}> = () => {
  const [symbolStr, setSymbolStr] = useState('')
  const [isLoad, setIsLoad] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsLoad(true)
    }, 200)
  }, [])

  const clickHandler = (symbolTxt: string) => {
    setSymbolStr(symbolTxt)
  }

  return (
    <>
      <StockPicker clickHandler={clickHandler} />
      <hr />
      <StockDetails stockQuery={symbolStr} />
    </>
  )
}

export default StockWidget
