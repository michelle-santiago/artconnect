import React, { useState, createContext } from "react";
export let CurrentUserContext = createContext({});

export const CurrentUserProvider = ({ children }) => {
    const currentUserProfile = JSON.parse(sessionStorage.getItem("current_user"))
    const [ currentUser, setCurrentUser ] =  useState(!currentUserProfile ? {} : currentUserProfile);

    const updateUserProfile = (data) => {
		sessionStorage.setItem("current_user", JSON.stringify(data));
		setCurrentUser(data);
	};
    
    return (
        < CurrentUserContext.Provider
            value={{
                currentUser,
                setCurrentUser,
                updateUserProfile
                
            }}
        >
            { children }
        </ CurrentUserContext.Provider>
    );
};