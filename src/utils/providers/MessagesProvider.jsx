import React, { useState, createContext } from "react";
export let MessagesContext = createContext({});

export const MessagesProvider = ({ children }) => {
    const messagesData = JSON.parse(sessionStorage.getItem("messages"))
    const [ messages, setMessages ] =  useState(!messagesData ? [] : messagesData);
    

    const updateMessage = (data) => {
      sessionStorage.setItem("messages", JSON.stringify(data));
      setMessages(data);
    };
      
    return (
        < MessagesContext.Provider
            value={{
                messages,
                setMessages,
                updateMessage    
            }}
        >
            { children }
        </ MessagesContext.Provider>
    );
};