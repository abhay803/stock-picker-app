import React from 'react'

import { IPagination } from './interface'
import './style.scss'

const BasePagination: React.FC<IPagination> = ({
  current,
  range,
  clickHandler,
}) => {
  return (
    <div className="page-navs">
      <button
        disabled={current === 0 ? true : false}
        onClick={() => clickHandler('left')}
      >
        Left
      </button>
      <button
        disabled={current === range ? true : false}
        onClick={() => clickHandler('right')}
      >
        Right
      </button>
    </div>
  )
}

export default BasePagination
