import React, {useEffect, useContext, useState, useRef} from 'react'
import { CurrentUserContext} from '../../utils/providers/CurrentUserProvider';
import { CommissionsContext } from '../../utils/providers/CommissionsProvider'
import { MessagesContext } from '../../utils/providers/MessagesProvider';
import { getCommissionMessages } from '../../api/api';
import toast, { Toaster } from 'react-hot-toast';
import dateFormat from '../../helper/dateFormat';
import { sendMessage } from '../../api/api';
import Message from '../Messages/Message';

const Messages = ({cable}) => {
  const { currentUser } = useContext(CurrentUserContext)
  const user = { currentUser }
  const { commission } = useContext(CommissionsContext)
  const { messages, setMessages, updateMessage } = useContext(MessagesContext)
  const [receiver, setReceiver] = useState({})
  const [dates, setDates] = useState([])
  const [messageBody, setMessageBody] = useState("")
	const messagesEndRef = useRef(null)
	const [scroll, setScroll] = useState(null)

  //setting msg request body
  let receiverId = user.currentUser.role === "artist" ? commission.data.client_id : commission.data.artist_id
  let requestId = commission.type === "request" ?  commission.data.id : commission.data.request_id
  let commissionId = commission.type === "request" ? "" : commission.data.id
  const chatId = [requestId, user.currentUser.id, receiverId].sort().join('')

  //setting date with today and yesterday
	const today = new Date();
	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1)
	const dateToday = dateFormat(today);
	const dateYesterday = dateFormat(yesterday);

  //group messages by date
	const addDay = ((date) => {
		let found = false;
		if (dates.length !== 0) {
			dates.forEach(dateData => {
				if (dateData === date) {
					found = true;
				}
			});
		}
		if (found === false) {
			dates.push(date)
		}
	})

  useEffect(() => {
    getCommissionMessages(
      { "Authorization" : user.currentUser.token},
      {
        kind: "commission",
        commission_id: commissionId,
        request_id: requestId,
        receiver_id: receiverId
      }).then(res => {
          // console.log(res.data,"response")
          const messages = res.data.messages
          const receiver = res.data.receiver
          updateMessage(messages)
          setReceiver(receiver)
          messages.forEach((message) => {
            addDay(dateFormat(message.created_at))
          })
          // toast.success("")				
        }).catch(err => {
        console.log(err,"error")
        toast.error("Try again. Something went wrong")
      })
	}, []);

  useEffect(()=>{
    cable.subscriptions.create
    (
      {
        id: chatId,
        body: messageBody,
        channel: 'CommissionChannel'
      },
      {
        received: (message) => {
          updateMessage(messages)
          setMessages([...messages, message.body])
        }
      }
    )
  },[messages])

  //sending message
	const handleSubmit = (e) => {
		e.preventDefault();
		if (messageBody === "" || messageBody === " ") {
			toast.error("Please input a message")
		}
		else {
			sendMessage(
      { "Authorization" : user.currentUser.token},
      {
				kind: "commission",
				receiver_id: receiverId,
        request_id: requestId,
        commission_id: commissionId,
				body: messageBody
			})
				.then(res => {
          // console.log(res.data)
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
        <div className="flex justify-between items-baseline">
          <h1 className="text-2xl">  {commission.type === "request" ? "Request" : "Commission"} # {commission.data.id}</h1>
          <span className="bg-primary-950 text-white text-xs font-medium mr-2 px-4 py-2 rounded border-green-400">{commission.data.status.toUpperCase()}</span>
        </div>
      <h1>{receiver.first_name} {receiver.last_name}</h1>
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
              <Message groupDate={date} messages={messages} receiver={receiver} sender={user}></Message>
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
      <Toaster position="top-center" reverseOrder={false}/>
    </>
  )
}

export default Messages