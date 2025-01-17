import { GoogleGenerativeAI }  from "@google/generative-ai"
import dotenv from "dotenv";
dotenv.config()
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
console.log("Ok chat start");
const conversation = async(prompt)=>{
    
   const result = await model.generateContent(prompt);
  
   return result.response.text()
}

export default conversation