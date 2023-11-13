import { Router } from "express";
import UserController from "../controllers/UserController"

const router : Router = Router();

router.get('/', UserController.getAllUsers);
router.get('/:username', UserController.getUserByUsername);
router.get('/exists/:username', UserController.isUserExists);
router.post('/create', UserController.createUser);
router.post('/auth', UserController.authorizeUser);

export default router;