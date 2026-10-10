import express from 'express'
import { getAllUsers, getUser, updateMe, updateUser } from '../controllers/userControllers.js'
import ownerOnly from '../middleware/authMiddleware/ownerOnly.js';
import authenticate from '../middleware/authMiddleware/authenticated.js';

const router = express.Router();

router.get('/getUsers', authenticate, ownerOnly, getAllUsers);
router.get('/:id', authenticate, ownerOnly, getUser);
router.post('/updateMe/:id', authenticate, updateMe);
router.post('/updateUser/:id', authenticate, ownerOnly, updateUser);


export default router;