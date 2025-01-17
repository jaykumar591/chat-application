import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';

const chatStore = create((set, get) => ({
  allChats: [],
  conversations: async (prompt) => {
    try {
      const response = await axiosInstance.post('/chat/start', { prompt }, {
        withCredentials: true,
      });
      const chats = get().allChats;
      set({ allChats: [...chats, {bot:response.data.data,user:prompt}] });
    } catch (error) {
      console.error('Error in conversations:', error);
    }
  },
}));

export default chatStore;
