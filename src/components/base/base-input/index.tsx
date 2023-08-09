import React from "react";

import {IBaseInput} from './interface';
import './style.scss';

const BaseInput: React.FC<IBaseInput> = ({name, placeholderText='Enter some text ...', value, onChange}) => {
    return <div className="base-input">
        <label>{name}</label>
        <input type="text" placeholder={placeholderText} value={value} onChange={onChange}/>
    </div>
}

export default BaseInput;
