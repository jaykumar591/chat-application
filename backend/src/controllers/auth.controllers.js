import User from '../model/user.model.js'
import asyncHandler from '../utils/asyncHandler.js'
import uploader,{uploadProfileOnCloudinary} from '../utils/cloudinary.js'
import ApiResponse from '../utils/ApiResponse.js'
import ApiError from '../utils/ApiError.js'
import generateToken from '../lib/generateToken.js'

const options = {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000  
};


const signup = asyncHandler(async(req,res)=>{
    const {email,password,fullName} = req.body 
    
    const profile = req.file?.path | ""
    
    
    if(!email || !password || !fullName){
        throw new ApiError(400,"All field are required")
    }
    const existUser = await User.findOne({email})
  
    if(existUser){
        throw new ApiError(400,"User already have an account")
    }
    let profileUrl = ""
    if(profile.length>=5){
        profile = await uploader(profile)
    }

    const newUser = await User.create({
        email:email,
        password:password,
        fullName:fullName,
        profile:profileUrl
    })

    if(!newUser){
        throw new ApiError(500,"something went wrong while saving user in mongodb")
    }
    const token = await generateToken(newUser._id)
    if(!token){
        throw new ApiError(500,"something went wrong while generate token")
    }
    const user = await User.findById(newUser._id).select("-password")
    return res 
    .status(201)
    .cookie('jwt',token,options)
    .json(new ApiResponse(201 ,user,"signup successfully" ))
})






const login = asyncHandler(async(req,res)=>{
    const {email,password} = req.body
   
    if(!email || !password){
        throw new ApiError(400,"all field are required")
    }
    let user = await User.findOne({email})
    if(!user){
        throw new ApiError(404,"user not found")
    }
    const isPasswordCurrect = await user.isPasswordCorrect(password)
    console.log(isPasswordCurrect);
    if(!isPasswordCurrect){
        throw new ApiError(401,"password invalid")
    }

    const token = await generateToken(user._id)
    if(!token){
        throw new ApiError(500,"something went wrong while creating token")
    }
    user = await User.findById(user._id).select("-password")
    return res 
    .status(200)
    .cookie('jwt',token,options)
    .json(new ApiResponse(200,user,"login successfully"))

})


const logout = asyncHandler(async(req,res)=>{
    if(!req.user){
        throw new ApiError(400, "user unauthorized")
    }
    const user = await User.findById(req.user._id)
    if(!user){
        throw new ApiResponse(404,"User not found")
    }

    return res 
    .status(200)
    .clearCookie('jwt')
    .json(new ApiResponse(200,{},"logout successfully"))

})


const currentUser = asyncHandler(async(req,res)=>{
    if(!req.user){
        return res.status(400).json(new ApiError(400,{},"Unauthorized request"))
    }
    const user = await User.findById(req.user._id).select("-password")
    if(!user){
        return res.status(404).json(new ApiResponse(404,{},"User not found"))
    }

    return res 
    .status(200)
    .json(new ApiResponse(200,user,"current user"))
})

const updateProfile = asyncHandler(async(req, res) => {
    const { profile } = req.body;
    if (!profile) {
        throw new ApiError(400, "All fields are required");
    }
    if (!req.user) {
        throw new ApiError(401, "Unauthorized request");
    }
    let user = await User.findById(req.user.id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const url = await uploadProfileOnCloudinary(profile);
    
   
    if (!url) {
        throw new ApiError(500, "Something went wrong while uploading profile on Cloudinary");
    }

    await User.findByIdAndUpdate(
        user._id,
        {
            profile: url,
        },
        {
            new: true
        }
    )
    user = await User.findById(user._id).select('-password')
    return res 
    .status(200)
    .json(new ApiResponse(200,user,"profile updated successfully "))
});

export {
    signup,
    login,
    logout,
    currentUser,
    updateProfile
}