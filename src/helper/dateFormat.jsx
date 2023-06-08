import React from 'react'

const dateFormat = (dateData) => {
    const currentDate =new Date(dateData); 
    const date = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(currentDate)
    return date;
}

export default dateFormat