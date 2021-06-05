import React, { useState, createContext, useContext } from 'react';

const themeConText = createContext()

const ChildNonTheme = () => {
    console.log('---------不关心皮肤的子组件渲染了');
    return <div>我不关皮肤，皮肤改变的时候，别让我重新渲染</div>
}

const ChildWithTheme = () => {
    const theme = useContext(themeConText);
    return <div>我是有皮肤的~{theme}</div>
}

const Page = () => {
    const [theme, setTheme] = useState('red');
    const changeTheme = () => setTheme(theme => theme === 'red' ? 'yellow' : 'red')

    return (
        <div>
            <themeConText.Provider value={theme}>
                <button onClick={changeTheme}>改变皮肤</button>
                <ChildNonTheme></ChildNonTheme>
                <ChildWithTheme></ChildWithTheme>
                <ChildWithTheme></ChildWithTheme>
                <ChildWithTheme></ChildWithTheme>
                <ChildWithTheme></ChildWithTheme>
            </themeConText.Provider>
        </div>
    )
}


export default Page


