import {Server} from 'socket.io'
import http from 'http'
import express from 'express'


const app = express()
const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin:'http://localhost:5173',
        
    }
})

export function getReceiverSocketId(userId){
    return userSocktMap[userId]
}

const userSocktMap = {};

io.on('connection',(socket)=>{
    console.log(" A user connected",socket.id);
    const userId = socket.handshake.query.userId
    console.log(userId);
    if(userId) userSocktMap[userId] = socket.id
    io.emit('getOnlineUsers', Object.keys(userSocktMap))
    socket.on('disconnect',()=>{
        console.log("A user disconnect",socket.id);
        delete userSocktMap[userId]
        io.emit('getOnlineUsers',Object.keys(userSocktMap))
    })
})

export {io,server,app}