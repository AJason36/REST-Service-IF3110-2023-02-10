import { Router } from "express";
import userRoutes from "./userRoutes";
import UserController from "../controllers/UserController"

const router : Router = Router();

router.use('/user', userRoutes);
router.post('/login', UserController.authorizeUser);
router.post('/register', UserController.createUser);

export default router;