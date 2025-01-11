import {Router} from 'express'
import {login,signup,logout,currentUser, updateProfile} from '../controllers/auth.controllers.js'
import uploader from '../middleware/multer.middleware.js'
import verifyJWT from '../middleware/auth.middleware.js'

const router = Router()

router.post('/signup',uploader.single("profile",),signup)
router.post('/login',login)
router.get('/current-user',verifyJWT,currentUser)
router.get('/logout',verifyJWT,logout)
router.put('/update-profile',verifyJWT,updateProfile)


export default router