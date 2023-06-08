import React from 'react'
import dateFormat from '../../helper/dateFormat'
import timeFormat from '../../helper/timeFormat'
const Message = (props) => {
  const groupDate = props.groupDate
  const messages = props.messages
  const receiver = props.receiver
  const sender = props.sender.currentUser
  return (
    <div className="pt-5">
    {messages.map((message,index)=>{
        const date = dateFormat(message.created_at)
        if(date === groupDate){
            return(
                <div key={index}>
                    <div className="flex items-start text-sm pt-3 gap-2">
                      <div className="relative w-8 h-8 overflow-hidden rounded bg-primary-50">
                          { message.sender_id === sender.id && sender.avatar === null || message.sender_id !== sender.id && receiver.avatar_url === null? 
                            <svg className="absolute w-8 h-8 text-primary-400 -left-.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                            :
                            <img src={message.sender_id === sender.id ? sender.avatar : receiver.avatar_url} className="h-8 w-8"/>
                          }
                      </div>
                        <div className="flex-1 overflow-hidden">
                            <div className="flex flex-row gap-2">
                                <span className="font-bold">{message.sender_id === sender.id ? sender.fullname : receiver.first_name+" "+receiver.last_name}</span>
                                <span className="text-grey text-xs pt-0.5">{timeFormat(message.created_at)}</span>
                            </div>
                            <p className="text-black leading-normal">{message.body}</p>
                        </div>
                    </div>
                </div>
            )
        }
    })}
</div>
  )
}

export default Message