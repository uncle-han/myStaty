import React, { useContext } from "react";

import {
    MyContext
} from '../../context/index';


export const InputCpn = () => {
    const context = useContext(MyContext);
    console.log('--InputCpn--context', context);
    return <input readOnly value={context.state}></input>
} 

