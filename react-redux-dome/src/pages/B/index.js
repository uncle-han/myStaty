import React, {
    useState
} from 'react'

const B = () => {
    const add = () => {
        console.log('点击了+ 1 按钮！！')
    }
    return (
        <div>
            <button onClick={add}>给A组件的num + 1</button>
        </div>
    )
}

export default B
