import React from 'react'

import { IListItem } from './interface'
import './style.scss'

const ListItem: React.FC<IListItem> = ({ keyName, keyVal }) => {
  return (
    <li className="base-list" key={keyName}>
      {keyVal}
    </li>
  )
}

export default ListItem
