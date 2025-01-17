import express from 'express'
import chatHandel from '../controllers/chatBot.controllers.js'
import verify from '../middleware/auth.middleware.js'
const routes = express.Router()


routes.post('/start',verify,chatHandel)

export default routes

