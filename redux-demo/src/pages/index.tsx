import React, {
  useState,
  useEffect
} from 'react';
import styles from './index.less';
import { createStore } from 'redux'
import { reducer } from '../reducer/index'
import {
  sendAction
} from '../action/index'

const store = createStore(reducer)

export default () => {
  const [state, setState  ] = useState('1')
  const clik = () => {
    console.log('点击了按钮')
    const acttion = sendAction()
    store.dispatch(acttion)
  }

  useEffect(() => {
    store.subscribe(() => {
      setState('123123')
      
      console.log('store.getState()', store.getState())
    })
  }, [])

  return (
    <div>
      <div>{state}</div>
      <h1 className={styles.title}>{store.getState().value}</h1>
      <button onClick={clik}>点我发送</button>
    </div>
  );
}
