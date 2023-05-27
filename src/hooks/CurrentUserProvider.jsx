import React, { useState, createContext } from "react";
export let UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
    const token = JSON.parse(sessionStorage.getItem("token"))
    const [ userToken, setUserToken ] =  useState(!token ? {} : token);
  
    const updateSessionToken = (data) => {
		sessionStorage.setItem("token", JSON.stringify(data));
		setUserToken(data);
	};
    console.log("hm")
    return (
        <UserContext.Provider
            value={{
                userToken,
                setUserToken,
                updateSessionToken
                
            }}
        >
            { children }
        </UserContext.Provider>
    );
};