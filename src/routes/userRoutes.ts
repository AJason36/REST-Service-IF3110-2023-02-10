import { Router } from "express";
import UserController from "../controllers/UserController"

const router : Router = Router();

router.get('/', UserController.getAllUsers);
router.get('/:username', UserController.getUserByUsername);
router.get('/exists/:username', UserController.isUserExists);

export default router;