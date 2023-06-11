import React, { useState, createContext, useEffect } from "react";
export let MessagesContext = createContext({});

export const MessagesProvider = ({ children }) => {
    const [ messages, setMessages ] =  useState([]);
      
    return (
        < MessagesContext.Provider
            value={{
                messages,
                setMessages,
            }}
        >
            { children }
        </ MessagesContext.Provider>
    );
};