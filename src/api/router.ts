import { Router } from "express";
import userRouter from "../entities/user/user.rotuer";
import roomRouter from "../entities/room/room.router";
const router = Router();
router.use(userRouter);
router.use(roomRouter);
export default router;