import User from "../model/user.model.js";
import JWT from 'jsonwebtoken'


const generateToken = async(userId)=>{
    const user = await User.findById(userId)
    if(!user){
        throw new Error("user not found")
    }
    return JWT.sign({id:userId},process.env.JWT_SECRET,{
        expiresIn:"7d"
    })
}

export default generateToken