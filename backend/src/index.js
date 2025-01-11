import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './connections/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import messageRouter from './routes/message.routes.js'
import bodyParser from 'body-parser'
import { app,server } from './lib/socket.js';
import path from 'path'

dotenv.config();
dbConnect();

const __dirname = path.resolve();
// Using method here
app.use(express.json());

// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' })); // 50 MB limit
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));
app.use(cookieParser());

// Routers part 
app.use('/api/auth', authRouter); // Added missing `/`
app.use('/api/messages',messageRouter)
// app.get('/', (req, res) => res.json({ message: "server running" }));

if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,"../../frontend")))
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,"../../frontend","dist","index.html"))
    })
}


server.listen(process.env.PORT, () => {
    console.log("Server started at ", process.env.PORT);
});
