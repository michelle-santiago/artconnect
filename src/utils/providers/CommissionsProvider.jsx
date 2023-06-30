import React, { useState, createContext } from "react";
export let CommissionsContext = createContext({});

export const CommissionsProvider = ({ children }) => {
    const [ commissions, setCommissions ] =  useState([]);
    const [ artistInfo, setArtistInfo] = useState([])
    const commissionData = JSON.parse(sessionStorage.getItem("commission"))
    const [ commission, setCommission ] =  useState(!commissionData ? [] : commissionData);
    const [ processes, setProcesses ] =  useState([]);
    
    return (
        < CommissionsContext.Provider
            value={{
                commissions,
                setCommissions,
                commission,
                setCommission,
                artistInfo,
                setArtistInfo,
                processes,
                setProcesses 
               
            }}
        >
            { children }
        </ CommissionsContext.Provider>
    );
};