import React from 'react'
import './style.scss'

const BaseButton: React.FC<{ btnName: string }> = ({ btnName }) => {
  return <div className="base-btn">{btnName}</div>
}

export default BaseButton
