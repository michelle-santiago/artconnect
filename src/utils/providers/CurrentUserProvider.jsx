import React, { useState, createContext } from "react";
export let CurrentUserContext = createContext({});

export const CurrentUserProvider = ({ children }) => {
    const token = JSON.parse(sessionStorage.getItem("token"))
    const [ userToken, setUserToken ] =  useState(!token ? {} : token);
  
    const updateSessionToken = (data) => {
		sessionStorage.setItem("token", JSON.stringify(data));
		setUserToken(data);
	};
    return (
        < CurrentUserContext.Provider
            value={{
                userToken,
                setUserToken,
                updateSessionToken
                
            }}
        >
            { children }
        </ CurrentUserContext.Provider>
    );
};