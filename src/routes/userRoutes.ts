import { authenticateToken } from '../utils/auth';
import { registerUser, getAllUser, loginUser, deleteUser, updateUser } from '../controllers/userController'
import express  from 'express';


const userRouter = express.Router()

userRouter.get('/', getAllUser)
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.delete('/:id', authenticateToken, deleteUser)
userRouter.put('/:id', authenticateToken, updateUser);




export default userRouter