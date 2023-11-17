import { Router } from "express";
import SubRequestController from "../controllers/SubRequestController"

const router : Router = Router();

router.post('/approve', SubRequestController.approveSubRequest);
router.post('/reject', SubRequestController.rejectSubRequest);
router.get('/:requestee', SubRequestController.getSubRequestOf);

export default router;