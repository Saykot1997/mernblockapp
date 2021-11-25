import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

// 

const INITIA_STATE = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isFeching: false,
    error: false
}

export const Context = createContext(INITIA_STATE);

export const ContextProvidor = ({ children }) => {

    const [state, dispatch] = useReducer(Reducer, INITIA_STATE);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);

    return <Context.Provider value={{
        user: state.user,
        isFeching: state.isFeching,
        error: state.error,
        dispatch
    }}>{children}</Context.Provider>
}

