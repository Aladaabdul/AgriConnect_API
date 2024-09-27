import { registerUser, getAllUser, loginUser, deleteUser, updateUser } from '../controllers/userController'
import express  from 'express';


const userRouter = express.Router()

userRouter.get('/', getAllUser)
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.delete('/:id', deleteUser)
userRouter.put('/:id', updateUser);




export default userRouter