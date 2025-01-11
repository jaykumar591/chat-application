import {create} from 'zustand'
import toast from 'react-hot-toast'
import {axiosInstance} from '../lib/axios'
import { useAuthStore } from './useAuthStore'


export const useChatStore = create((set,get)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,
    getUsers:async()=>{
        set({isUsersLoading:true})
        try {
            const res = await axiosInstance.get('/messages/users')
            
            set({users:res.data.data})
        } catch (err) {
            toast.error(err.messages)
        } finally {
            set({isUsersLoading:false})
        }
    },
    getMessages:async(userId)=>{
        set({isMessagesLoading:true})
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            
            set({messages:res.data.data})
        } catch (err) {
            toast.error(err.message)
        } finally {
            set({isMessagesLoading:false})
        }
    },
    setSelectedUser:(selectedUser)=>set({selectedUser}),
    sendMessage:async(messageData)=>{

        try {
            const {selectedUser,messages} = get()

            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData)
            set({messages:[...messages,res.data.data]})
        } catch (error) {
           
            toast.error(error.message)
            
        }
    },
    
    subscriptToMessage:()=>{
        const {selectedUser} = get()
        if(!selectedUser) return;
        const socket = useAuthStore.getState().socket
        socket.on("newMessage",(newMessage)=>{
            if(newMessage.senderId===selectedUser)return;
           
         set({messages:[...get().messages,newMessage]})
        })
    },
    unsubcribeToMessages:()=>{
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    }
 
}))
