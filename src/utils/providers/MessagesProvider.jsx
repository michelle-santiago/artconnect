import React, { useState, createContext, useEffect } from "react";
export let MessagesContext = createContext({});

export const MessagesProvider = ({ children }) => {
    const [ messages, setMessages ] =  useState([]);
    const contactsData= JSON.parse(sessionStorage.getItem("contacts"))
    const [ contacts, setContacts ] =  useState(!contactsData ? [] : contactsData);
    const contactData= JSON.parse(sessionStorage.getItem("contact"))
    const [ contact, setContact ] =  useState(!contactData ? null : contactData);

    const updateContacts = (data) => {
		sessionStorage.setItem("contacts", JSON.stringify(data));
		setContacts(data);
	};

    const updateContact = (data) => {
		sessionStorage.setItem("contact", JSON.stringify(data));
		setContact(data);
	};
      
    return (
        < MessagesContext.Provider
            value={{
                messages,
                setMessages,
                contacts,
                setContacts,
                updateContacts,
                contact,
                setContact,
                updateContact
            }}
        >
            { children }
        </ MessagesContext.Provider>
    );
};