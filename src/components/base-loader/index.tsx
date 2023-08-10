import React from 'react'

import './style.scss'

const BaseLoader: React.FC<{ height: string; width: string }> = ({
  height,
  width,
}) => {
  return <div className="loader" style={{ height: height, width: width }}></div>
}

export default BaseLoader
