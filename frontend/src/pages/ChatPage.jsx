import { useEffect, useRef, useState } from 'react';
import chatStore from '../store/chatBotStore'
function ChatPage() {
  const [prompt,setPrompt] = useState("")
  const {allChats,conversations} = chatStore()
  const lastPage = useRef()
  const handelChats = async()=>{
    conversations(prompt)
    setPrompt("")
  }
  useEffect(()=>{
    lastPage.current.scrollIntoView({behavior:"smooth"})
  },[lastPage,allChats])
  return (
    <div className='min-h-screen w-screen bg-primary/20 pb-10'>
      <div className='pt-20  flex items-center w-screen'>
        <div className="bg-black rounded-md px-10  py-4 m-auto ">
          {
            allChats.map((item,inde)=>{
              return <div className=' flex flex-col justify-around' key={inde}>
                <div className='w-full flex justify-end'><h1 className='bg-[#aee1] py-2 px-4 rounded-lg  w-auto text-center pr-3'>{item.user}</h1></div>
                <div className='max-w-96 overflow-auto' dangerouslySetInnerHTML={{ __html: item.bot }} />
              </div>
            })
          }
        </div>
        
      </div>
         <div className='fixed bottom-1  flex justify-center gap-2 w-screen '>
         <input value={prompt} onChange={(e)=>setPrompt(e.target.value)} className=' px-4 py-2  outline-none rounded-lg' type="text" placeholder='Ask question ' />
         <button onClick={handelChats} className='btn  py-2 px-4 rounded-lg  '>Chat</button>
         </div>
         <div className='mt-5' ref={lastPage} />
      </div>
  )
}

export default ChatPage