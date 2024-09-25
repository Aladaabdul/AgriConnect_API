import { registerUser, getAllUser, loginUser } from '../controllers/userController'
import express  from 'express';


const userRouter = express.Router()

userRouter.get('/', getAllUser)
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)




export default userRouter