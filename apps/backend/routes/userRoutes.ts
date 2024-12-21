import { Router } from 'express';
import { updateUserData, fetchUserData, fetchAllUsers, deleteUser ,registerUser, loginUser} from '../controller/api';
import { authMiddleware } from '../middleware/authMiddleware';


const router = Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.put('/users-update/:uid', authMiddleware, updateUserData);

router.get('/users/:uid', authMiddleware, fetchUserData);

router.get('/users', authMiddleware, fetchAllUsers);

router.delete('/users/:uid', authMiddleware, deleteUser);

export default router;

