import {useState, createContext} from 'react';

export const AppContext = createContext();

// we take in props because we want access to the children
const AppContextProvider = (props) => {
    // put our state
    const [user, setUser] = useState(false);
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");

    return (
        <AppContext.Provider value={{
            user, setUser,
            todos, setTodos,
            newTodo, setNewTodo
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;