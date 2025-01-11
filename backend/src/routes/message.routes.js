import {Router} from 'express'
import verifyJWT from '../middleware/auth.middleware.js'
import {getUser,getMessage,sendMessage} from '../controllers/message.controllers.js'


const router = Router()


router.get('/users',verifyJWT, getUser)
router.get('/:id',verifyJWT , getMessage)
router.post('/send/:id',verifyJWT,sendMessage)




export default router