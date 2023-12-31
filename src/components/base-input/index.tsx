import React from 'react'

import { IBaseInput } from './interface'
import './style.scss'

const BaseInput: React.FC<IBaseInput> = ({
  name,
  placeholderText = 'Enter some text ...',
  value,
  onChange,
  onClick,
}) => {
  return (
    <div className="base-input">
      <label>{name} ::</label>
      <input
        type="text"
        placeholder={placeholderText}
        value={value}
        onChange={onChange}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            console.log('Enter key api call ...')
            onClick()
          }
        }}
      />
    </div>
  )
}

export default BaseInput
