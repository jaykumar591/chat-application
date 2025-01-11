import mongoose from 'mongoose'


const  dbConnect = async ()=>{

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
    
        console.log("mongodb connections connected at host : ",conn.connection.host);
    } catch (error) {
        console.log("something went wrong while connecting mongodb");
        process.exit(1)
    }
}

export default dbConnect