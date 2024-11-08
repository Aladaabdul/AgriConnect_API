import { authenticateToken } from '../utils/auth';
import { registerUser, getAllUser, loginUser, deleteUser, updateUser, getUserById } from '../controllers/userController'
import express  from 'express';


const userRouter = express.Router()

userRouter.get('/', getAllUser)
userRouter.get('/:userId', getUserById);
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.delete('/delete/:id', authenticateToken, deleteUser)
userRouter.put('/:id', authenticateToken, updateUser);




export default userRouter;