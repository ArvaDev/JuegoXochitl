import { Router } from "express";
import { createUser, getUsers, joinRoom } from "./user.control";

const userRouter = Router();

userRouter.post("/users", createUser);
userRouter.get("/users", getUsers);
userRouter.post("/users/join", joinRoom);

export default userRouter;
