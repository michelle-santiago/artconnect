import React, { useState, createContext } from "react";
export let CommissionsContext = createContext({});

export const CommissionsProvider = ({ children }) => {
    const [ commissions, setCommissions ] =  useState([]);
    const [ artistInfo, setArtistInfo] = useState([])
    
    //note update later
    // const [ processes, setProcesses ] =  useState([]);
    
    return (
        < CommissionsContext.Provider
            value={{
                commissions,
                setCommissions,
                artistInfo,
                setArtistInfo
                // processes,
                // setProcesses 
               
            }}
        >
            { children }
        </ CommissionsContext.Provider>
    );
};