import React, { useState, createContext } from "react";
export let CommissionsContext = createContext({});

export const CommissionsProvider = ({ children }) => {
    const [ commissions, setCommissions ] =  useState([]);;

    return (
        < CommissionsContext.Provider
            value={{
                commissions,
                setCommissions, 
            }}
        >
            { children }
        </ CommissionsContext.Provider>
    );
};