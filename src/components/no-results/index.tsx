import React from 'react'

const NoResult: React.FC<{ message: string }> = ({ message }) => {
  return <p className="no-result">{message} !!!</p>
}

export default NoResult
