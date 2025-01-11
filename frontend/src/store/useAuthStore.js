import {create} from 'zustand'
import {axiosInstance} from '../lib/axios'
import toast from 'react-hot-toast'
import {io}from 'socket.io-client'
const BASE_URL = import.meta.env.MODE==='development'?'http://localhost:5001':'/'

export const useAuthStore = create((set,get)=>({
    authUser:null,
    isCheckingAuth:true,
    isSigningUp:false,
    isLoging:false,
    isUpdatingProfile:false,
    onlineUsers:[],
    socket:null,
    checkAuth:async()=>{
        try {
            const res = await axiosInstance.get('/auth/current-user')
            
            set({authUser:res.data.data})
            get().connectSocket()
        } catch (error) {
            console.log("something wrong",error);
            set({authUser:null})
        }
        finally{
            set({isCheckingAuth:false})
        }
    },
    signup:async(data)=>{
       try {
        set({isSigningUp:true});
        const res = await axiosInstance.post('/auth/signup',data)
        toast.success("Account created successfully")
        get().connectSocket()
        set({authUser:res.data.data})
       } catch (error) {
        toast.error(error.message)
       }
       finally{
         set({isSigningUp:false})
       }
    },
    logout:async()=>{
        try {
            
            await axiosInstance.get('/auth/logout')
            set({authUser:null})
            toast.success("log out successfully")
            get().disconnectSocket()
        } catch (error) {
            toast.error(error.message)
        }
    },
    login:async(data)=>{
        set({isLoging:true})
        try {
            const res = await axiosInstance.post('/auth/login',data)
            
            set({authUser:res.data.data})
            toast.success("login successfully")
            get().connectSocket()
        } catch (error) {
            console.log(error);
            toast.error(error)
        }finally{
            set({isLoging:false})
        }
    },
    updateProfile:async(data)=>{
        try {
            const res = await axiosInstance.put("/auth/update-profile",data)
            set({authUser:res.data.data})
            toast.success("Profile updated successfully")
        } catch (err) {
            console.log(err.message);
            toast.error(err.message)
        } finally {
            set({isUpdatingProfile:false})
        }
    },

    connectSocket:()=>{
        const {authUser} = get()
        if(!authUser || get().socket?.connected)return
        const socket = io(BASE_URL,{
            query:{
                userId:get().authUser._id
            }
        })
        socket.connect()
        set({socket:socket})

        socket.on('getOnlineUsers',(userIds)=>{
            set({onlineUsers:userIds})
        })
    },
    disconnectSocket:()=>{
        if(get().socket.connected) get().socket.disconnect()
    },
   
}))