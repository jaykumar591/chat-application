import {useEffect, useRef}from 'react'
import MessageInput from './MessageInput'
import ChatHeader from './ChatHeader'
import { useChatStore } from '../store/useChatStore'
import MessageSkeleton from './skeletons/MessageSkeleton'
import { useAuthStore } from '../store/useAuthStore'
import defaultAvatarImage from '../assets/images/defaultProfile.png'
import {formatMessageTime} from '../lib/dateFormate'


function ChatContainer() {
  const {messages,getMessages,isMessageLoading,selectedUser,subscriptToMessage,unsubcribeToMessages} = useChatStore()
  const {authUser}=useAuthStore()
  const messageEndRef = useRef()

  
  useEffect(() => {
    getMessages(selectedUser._id)
    subscriptToMessage()
    return ()=>unsubcribeToMessages()
  }, [selectedUser._id,getMessages,subscriptToMessage,unsubcribeToMessages])
  useEffect(()=>{
    if(messageEndRef.current && messages)
    messageEndRef.current.scrollIntoView({"behavior":"smooth"})
  },[messages])
  
  if(isMessageLoading)return (
     <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader/>
      <MessageSkeleton/>
     </div>
  )
  
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader/>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message)=>(
          <div ref={messageEndRef} key={message._id} className={`chat ${message.senderId===authUser._id?'chat-end':'chat-start'}`}>
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img src={message.senderId===authUser._id ?authUser.profile || defaultAvatarImage:selectedUser.profile || defaultAvatarImage} alt="profile pic" />
              </div>
            </div>
             <div className="chat-header mb-1">
              <time  className='ext-xs opacity-50 ml-1' >{formatMessageTime(message.createdAt)}</time>
             </div>
             <div className="chat-bubble flex flex-col">
              {message.image &&(
                <img src={message.image}alt='Attachment' className='sm:max-w-[200px] rounded-md mb-2' />

              )}
              {message.text&&<p>{message.text}</p>}
             </div>
          </div>
        ))}
      </div>

      <MessageInput/>
    </div>
  )
}

export default ChatContainer