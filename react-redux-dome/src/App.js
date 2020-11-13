import React from 'react'
// import logo from './logo.svg';
// import './App.css';
import A from './pages/A/index'
import B from './pages/B/index'
import {
  Provider
} from 'react-redux'

import store from './store/index'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <A>
          <div>我是A组件里面的div</div>
        </A>
        <B></B>
      </div>
    </Provider>
  );
}

export default App;
