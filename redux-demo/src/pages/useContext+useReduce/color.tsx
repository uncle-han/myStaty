import React, { createContext, useReducer } from 'react';

type InitValue = {
  color: string;
};

export const a = 1;
interface ReduserInterface {
  state: InitValue;
  a?: '123',
}

interface ActionInyerface {}

const initValue: InitValue = {
  color: 'blue',
};

export const ColorContext = createContext(initValue);

export const Color = (props: any) => {
  const [color, dispatchColor] = useReducer<InitValue, ActionInyerface>(
    (state: InitValue, action: string): InitValue => {
      switch (action) {
        case 'y':
          return (state.color = 'yellow');
        case 'r':
          return (state.color = 'red');
        default:
          return state;
      }
    },
    initValue,
  );
  console.log('--props--', props);
  return (
    <ColorContext.Provider value={{ color, dispatchColor }}>
      {props.children}
    </ColorContext.Provider>
  );
};
