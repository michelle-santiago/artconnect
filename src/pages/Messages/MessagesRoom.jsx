import React, {useEffect, useContext, useState, useRef} from 'react'
import { CurrentUserContext} from '../../utils/providers/CurrentUserProvider';
import { CommissionsContext } from '../../utils/providers/CommissionsProvider'
import { MessagesContext } from '../../utils/providers/MessagesProvider';
import { getMessages } from '../../api/api';
import toast, { Toaster } from 'react-hot-toast';
import dateFormat from '../../helper/dateFormat';
import { sendMessage } from '../../api/api';
import Messages from './Messages';
import actionCable from 'actioncable'

const CableApp = {}
CableApp.cable = actionCable.createConsumer('ws://localhost:3000/cable')

const MessagesRoom = (props) => {
  const cable = CableApp.cable
  const category = props.category
  const { currentUser } = useContext(CurrentUserContext)
  const user = { currentUser }
  const { commission } = useContext(CommissionsContext)
  const { messages, setMessages, contact } = useContext(MessagesContext)
  const [receiver, setReceiver] = useState({})
  const [dates, setDates] = useState([])
  const [messageBody, setMessageBody] = useState("")
	const messagesEndRef = useRef(null)
	const [scroll, setScroll] = useState(null)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [IsDisconnected, setIsDisconnected] = useState(false)
  const [messageReceived, setMessageReceived] = useState({})
  //setting msg request body
  let receiverId = user.currentUser.role === "artist" ? commission.data.client_id : commission.data.artist_id
  let requestId = commission.type === "request" ?  commission.data.id : commission.data.request_id
  let commissionId = commission.type === "request" ? "" : commission.data.id
  let chatId = [requestId, user.currentUser.id, receiverId].sort().join('')

  //setting date with today and yesterday
	const today = new Date();
	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1)
	const dateToday = dateFormat(today);
	const dateYesterday = dateFormat(yesterday);
  
  useEffect(() => {
      if(category === "direct"){
        receiverId = contact && contact.id
        chatId = [user.currentUser.id, receiverId].sort().join('')
      }
      if(contact !== null || category === "commission"){
        getMessages(
          { "Authorization" : user.currentUser.token},
          {
            kind: category,
            commission_id: commissionId,
            request_id: requestId,
            receiver_id: receiverId
          }).then(res => {
              const messagesData = res.data.messages
              const receiver = res.data.receiver
              setMessages(messagesData)
              setReceiver(receiver)
              let uniqueDates = [dateFormat(today)]
              if (messagesData.length !== 0) {
                uniqueDates = [...new Set(messagesData.map((message) => dateFormat(message.created_at)))]
              }
              setDates(uniqueDates)
            }).catch(err => {
            console.log(err,"error")
            toast.error("Try again. Something went wrong")
          })
      }
	}, [contact, commission]);

  const subscription = () => {
    let channel = category === "commission" ? "CommissionChannel" : "DirectChannel"
    const subscription = cable.subscriptions.create
    (
      {
        id: chatId,
        channel: channel
      },
      {
        received: (message) => {
          if(message.body.sender_id !== user.currentUser.id){
            setMessageReceived(message.body)
          }
        },
        initialized() {
          setIsSubscribed(true)
        },
      
        connected() {
          setIsDisconnected(false)
        },
        disconnected() {
          setIsDisconnected(true)
        }
      }
    )
    return subscription
  }

  useEffect(()=>{
    if (isSubscribed){
      cable.subscriptions.remove(subscription())
    }else{
      subscription()
    }
  },[isSubscribed])

  useEffect(()=>{
   if(IsDisconnected){
    toast.error("Disconnected. Refresh the page")
   }else{
    toast.success("You are now connected")
   } 
  },[IsDisconnected])

  useEffect(()=>{
    const lastMsg = messages[messages.length - 1]
    if((lastMsg && messageReceived && lastMsg.id !== messageReceived.id)){
      setMessages(prevState => [...prevState,  messageReceived])	
    }
  },[messageReceived])

  //sending message
	const handleSubmit = (e) => {
		e.preventDefault();
    if(category === "direct"){
      receiverId = contact && contact.id
      chatId = [user.currentUser.id, receiverId].sort().join('')
    }
		if (messageBody === "" || messageBody === " ") {
			toast.error("Please input a message")
		}else if(contact === null && category === "direct"){
      toast.error("No contact to message")
    }
		else {
			sendMessage(
      { "Authorization" : user.currentUser.token},
      {
				kind: category,
				receiver_id: receiverId,
        request_id: requestId,
        commission_id: commissionId,
				body: messageBody
			})
				.then(res => {
          setMessages(prevState => [...prevState,  res.data])	
          setMessageBody("")
          toast.success("Message sent!")
				}).catch(err => {+
					console.log(err)
				})
		}
	}
	const handleChange = (e) => {
		setMessageBody(e.target.value)
	}
  const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
	}

	useEffect(() => {
		scrollToBottom()
	}, [messages, scroll]);

  return (
    <>
      <div className="mb-2">
        {category === "commission" &&
          <div className="flex justify-between items-baseline">
            <h1 className="text-2xl">  {commission.type === "request" ? "Request" : "Commission"} # {commission.data.id}</h1>
            <span className="bg-primary-950 text-white text-xs font-medium mr-2 px-4 py-2 rounded border-green-400">{commission.data.status.toUpperCase()}</span>
          </div>
        }
        <h1 className="pt-2 pb-2 font-semibold">{receiver.first_name} {receiver.last_name}</h1>
      </div>
      <div className="h-96 px-6 flex-1 overflow-y-scroll pb-7">
        {dates.map((date, index) => {
          return (    
            <div key={index}>
              <div className="flex justify-center">
                <div className=" bg-white rounded-full border border-primary-300 text-black text-sm font-bold p-2">
                  {date === dateToday && "Today"}
                  {date === dateYesterday && "Yesterday"}
                  {date !== dateToday && date !== dateYesterday && date}
                </div>
              </div>
              <hr className="-mt-5"></hr>
              <Messages groupDate={date} messages={messages} receiver={receiver} sender={user}></Messages>
              <div ref={messagesEndRef} />
            </div>
          )
        })}
      </div>
      <form className="flex overflow-hidden border" onSubmit={handleSubmit}>
        <input type="text" className="w-full px-4 border-none focus:ring-0 focus:ring-primary-950 focus:border-primary-950" placeholder="Message" value={messageBody} onChange={handleChange} />
        <button type="submit" className="cursor-pointer text-3xl text-grey p-2" onSubmit={handleSubmit}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:text-primary">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </button>
      </form>
      <Toaster position="bottom-center" reverseOrder={false}/>
    </>
  )
}

export default MessagesRoom