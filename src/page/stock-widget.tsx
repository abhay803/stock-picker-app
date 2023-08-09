import React, { useState, useCallback } from 'react'

import { StockPicker, StockDetails } from '../container'

const StockWidget: React.FC<{}> = () => {
  const [symbolStr, setSymbolStr] = useState('')

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
