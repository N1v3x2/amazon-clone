import React, { createContext, useContext, useReducer } from 'react';

//creates the storage space
export const StateContext = createContext();

//wrap the app and provides data layer to all components in the app
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

//pull info from the data layer
export const useStateValue = () => useContext(StateContext);