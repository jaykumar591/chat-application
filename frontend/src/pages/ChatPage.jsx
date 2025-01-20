import { useEffect, useRef, useState } from 'react';
import chatStore from '../store/chatBotStore';
import Md from 'markdown-to-jsx';
import '../assets/ChatPage.css';

function ChatPage() {
  const [prompt, setPrompt] = useState("");
  const { allChats, conversations } = chatStore();
  const lastPage = useRef();

  const handleChats = async () => {
    conversations(prompt);
    setPrompt("");
  };

  useEffect(() => {
    lastPage.current.scrollIntoView({ behavior: "smooth" });
  }, [allChats]);

  return (
    <div className="min-h-screen bg-primary/20 pb-10">
      {/* Chat Messages Container */}
      <div className="pt-20 flex items-center">
        <div className="rounded-md px-4 md:px-10 py-4 m-auto w-full md:w-[80%]">
          {allChats.map((item, index) => (
            <div
              className="w-full flex flex-col gap-4 mx-auto"
              key={index}
            >
              {/* User Message */}
              <div className="flex justify-end">
                <h1 className="bg-[#aee1] shadow-sm hover:bg-primary/10 shadow-primary my-2 py-2 px-4 rounded-lg max-w-[90%] md:max-w-[70%] break-words">
                  {item.user}
                </h1>
              </div>
              {/* Bot Response */}
              <div className="shadow-sm shadow-primary rounded-md px-4 py-2  overflow-auto max-w-[90%] md:max-w-[70%] break-words">
                <Md>{item.bot}</Md>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Section */}
      <div className="fixed bottom-1 flex justify-center gap-2 w-screen px-4">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full max-w-[80%] md:max-w-[70%] px-4 py-2 outline-none rounded-lg shadow-md"
          type="text"
          placeholder="Ask a question"
        />
        <button
          onClick={handleChats}
          className="btn bg-primary text-white py-2 px-4 rounded-lg shadow-md"
        >
          Chat
        </button>
      </div>

      <div className="mt-5" ref={lastPage} />
    </div>
  );
}

export default ChatPage;
