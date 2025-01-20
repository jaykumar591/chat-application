import conversation from "../utils/Conversation.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
// import {marked} from "marked";

const chatHandler = asyncHandler(async (req, res) => {
    const { prompt } = req.body;

    if (!prompt || !prompt.trim()) {
        return res.status(400).json(new ApiResponse(400, {}, "Prompt is required"));
    }

    let chatBotResponse = await conversation(prompt);
    let result = chatBotResponse.toString().replace("Google","Jay'AI")

    return res.status(200).json(new ApiResponse(200, result, "Response"));
});

export default chatHandler;
