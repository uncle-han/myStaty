import React, { useState, createContext, useContext } from 'react';
import './style.less';

const LogsConText = createContext();

const LogProvider = ({children}) => {
    const [logs, setLogs] = useState([]);
    const logchange = log => setLogs([...logs, log])
    return (
        <LogsConText.Provider value={{logs, logchange}}>
            {children}
        </LogsConText.Provider>
    )
}

const LogsPannel = () => {
    const { logs } = useContext(LogsConText);
    return (
        <ul>
            {logs.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
    )
}

const LogGenerateOne = () => {
    const { logchange } = useContext(LogsConText);
    console.log('generate 1 have been render');
    return (
        <div>
           <h2>日志生成器 1</h2>
           <button onClick={() => logchange('generate 1')}>生成</button>
        </div>
    )
}
const LogGenerateTow = () => {
    const { logchange } = useContext(LogsConText);
    console.log('generate 2 have been render');
    return (
        <div>
           <h2>日志生成器 2</h2>
           <button onClick={() => logchange('generate 2')}>生成</button>
        </div>
    )
}

const Page = () => {

    return (
        <div>
            <LogProvider>
                <LogGenerateOne />
                <LogGenerateTow />
                <LogsPannel />
            </LogProvider>
        </div>
    )
}


export default Page
