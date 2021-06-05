import React, { useContext } from "react";
import { ColorContext } from './color'

const Text = () => {
    const {color, ...colorCoutext} = useContext(ColorContext);
    console.log('--colorCoutext--', colorCoutext, '--color--', color);
    return <h3 style={{color: color}}>我现在的颜色是{color}</h3>
}

export default Text

