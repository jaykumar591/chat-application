import JWT from 'jsonwebtoken'
import User from '../model/user.model.js'
import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../utils/ApiError.js'


const verifyJWT = asyncHandler(async(req,_,next)=>{
    
    const token = req.cookies.jwt
    
    if(!token){
        throw new ApiError(400,"Unauthorized request")
    }


    const decode = JWT.verify(token,process.env.JWT_SECRET)
    if(!decode){
        throw new ApiError(400,"invalid token")
    }
    const user = await User.findById(decode.id).select("-password")
    if(!user){
        throw new ApiError(404,"not found users(404)")
    }
    req.user = user;
    next()

})

export default verifyJWT