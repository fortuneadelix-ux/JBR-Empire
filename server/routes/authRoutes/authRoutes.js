import express from "express";
import { login, register } from "../../controllers/authControllers/authControllers.js";
import me from "../../controllers/authControllers/me.js";
import authenticate from "../../middleware/authMiddleware/authenticated.js";
import ownerOnly from "../../middleware/authMiddleware/ownerOnly.js";

const routter = express.Router();

routter.post('/createUser', authenticate, ownerOnly, register)
routter.post('/login', login);
routter.get('/me', authenticate, me);

export default routter;