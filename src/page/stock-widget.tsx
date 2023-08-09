import React, { useState } from "react";

import BaseInput from "../components/base/base-input";
import ListItem from "../components/base/base-list-item";
import {mockList} from "./constant";

import './style.scss';

const StockWidget: React.FC = () => {
    const [searchTxt, setSearchTxt] = useState('');
    const [list, setList] = useState(mockList)

    const handleChange = (e:any) => {
        const tempVal = e.target.value;
        
        setSearchTxt(tempVal);
    }

    const getLiatView = () => {
        return <ul>
            {list.map((item, idx) => <ListItem keyName={String(idx)} keyVal={item}/>)}
        </ul>
    }

    return <>
        <BaseInput name='Stock Name' placeholderText='Enter Stock Name' value={searchTxt} onChange={handleChange}/>
        {
            !list.length
                ? null
                : getLiatView()
        }
    </>
}

export default StockWidget;