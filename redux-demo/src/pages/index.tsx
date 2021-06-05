import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useReducer,
  createRef,
  useRef,
} from 'react';
import styles from './index.less';
import { createStore } from 'redux';
// import { reducer } from '../reducer/index';
// import { sendAction } from '../action/index';

import { Button } from 'antd';

import { MyContext } from '../context/index';

import { InputCpn } from './useContextDome/index';
import MyRedux from './useContext+useReduce/myRedux';

const btnRef = createRef();

// const store = createStore(reducer);

export default () => {
  const [state, setState] = useState({
    num: '1',
  });
  const btn = useRef(btnRef);
  const clik = () => {
    console.log('点击了按钮');
    // const acttion = sendAction()
    // store.dispatch(acttion)
    setState(pre => ({
      num: `${+pre.num + 1}`,
    }));
  };

  useEffect(() => {
    // store.subscribe(() => {
    //   console.log('store.getState()', store.getState());
    // });
  }, []);

  const [constor, dispatch] = useReducer((state: number, action: string): number => {
    switch (action) {
      case 'add':
        return ++state;
      case 'sub':
        return --state;
      default:
        return state;
    }
  }, 0);

  return (
    <div>
      <div>{state.num}</div>
      <h2>useContext</h2>
      {/* <h1 className={styles.title}>{store.getState().value}</h1> */}
      <button onClick={clik}>点我发送</button>
      <Button ref={btnRef}>useRef</Button>
      <MyContext.Provider value={state}>
        <InputCpn />
      </MyContext.Provider>

      <hr />
      <h2>useReducer</h2>
      <div>现在是数值是：{constor}</div>
      <div>
        <Button onClick={() => dispatch('add')}>increment</Button>
        <Button onClick={() => dispatch('sub')}>decrement</Button>
      </div>

      <hr />
      <h2>useReducer + useContext</h2>
      <MyRedux></MyRedux>
    </div>
  );
};
