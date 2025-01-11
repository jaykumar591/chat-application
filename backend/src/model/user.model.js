import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true, 
        trim: true,
        required: true,
        minLength: 10,
        unique: true
    },
    fullName: {
        type: String,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    profile:{
        type:String,
        default:"www.google.com"
    }
},{timestamps:true});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next(); 
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.isPasswordCorrect = function(password) {
    return bcrypt.compare(password, this.password);
};


const User = mongoose.model('User', userSchema);
export default User;
