import React, { useState, createContext, useContext, useCallback } from "react";
import "./style.less";

const LogsDisparcherConText = createContext();
const LogsValueConText = createContext();

const LogProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);
  const logchange = useCallback((log) => {
    setLogs((preLog) => [...preLog, log]);
  }, []);
  return (
    <LogsDisparcherConText.Provider value={ logchange }>
      <LogsValueConText.Provider value={ logs }>
        {children}
      </LogsValueConText.Provider>
    </LogsDisparcherConText.Provider>
  );
};

const LogsPannel = () => {
  const logs = useContext(LogsValueConText);
  return (
    <ul>
      {logs.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
};

const LogGenerateOne = () => {
  const logchange = useContext(LogsDisparcherConText);
  console.log("generate 1 have been render");
  return (
    <div>
      <h2>日志生成器 1</h2>
      <button onClick={() => logchange("generate 1")}>生成</button>
    </div>
  );
};
const LogGenerateTow = () => {
  const logchange = useContext(LogsDisparcherConText);
  console.log("generate 2 have been render");
  return (
    <div>
      <h2>日志生成器 2</h2>
      <button onClick={() => logchange("generate 2")}>生成</button>
    </div>
  );
};

const Page = () => {
  return (
    <div>
      <LogProvider>
        <LogGenerateOne />
        <LogGenerateTow />
        <LogsPannel />
      </LogProvider>
    </div>
  );
};

export default Page;
