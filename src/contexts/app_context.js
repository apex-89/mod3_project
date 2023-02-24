import {useState, createContext} from 'react';

export const AppContext = createContext();

// we take in props because we want access to the children
const AppContextProvider = (props) => {
    // put our state
 
    return (
        <AppContext.Provider>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;