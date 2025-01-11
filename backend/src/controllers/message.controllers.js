import User from "../model/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import Message from '../model/message.model.js'
import uploader from "../utils/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

const getUser = asyncHandler(async (req, res) => {
    const loggedInUserId = req.user.id; // Corrected to req.user.id
    const filtterUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password');
    
    if (filtterUsers.length === 0) { // Updated condition to check if the array is empty
        throw new ApiError(404, "No users found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, filtterUsers, "Get user list successfully"));
});


const getMessage = asyncHandler(async(req,res)=>{
    const {id:receiverId} = req.params
    const senderId = req.user.id

    const message = await Message.find({
        $or:[
            {senderId:senderId, receiverId:receiverId},
            {receiverId:senderId, senderId:receiverId}
        ]
    })

    return res 
    .status(200)
    .json(new ApiResponse(200,message))

})

const sendMessage = asyncHandler(async(req,res)=>{
    const {text , image} = req.body

    if(!text && !image){
        throw new ApiError(400,"text or image field are required")
    }

    let imageUrl="";
    if(image){
        imageUrl = await uploader(image)
    }
    const {id:receiverId} = req.params
    const senderId = req.user.id
    const newMessage = await Message.create({
        senderId:senderId,
        receiverId:receiverId,
        text:text,
        image:imageUrl
    })
    // todo real time communication
    const receiverSocketId = getReceiverSocketId(receiverId)
    if(receiverSocketId){
        io.to(receiverSocketId).emit('newMessage',newMessage)
    }
   
    return res 
    .status(201)
    .json(new ApiResponse(201,newMessage,"message sended"))


})


export { getUser,
    getMessage,
    sendMessage
 };
