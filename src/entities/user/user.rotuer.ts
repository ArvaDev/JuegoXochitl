import { Router } from "express";
import { createUser, getUsers, joinRoom, getUserById } from "./user.control";

const userRouter = Router();

userRouter.post("/users", createUser);
userRouter.get("/users", getUsers);
userRouter.get("/users/:id", getUserById);
userRouter.post("/users/join", joinRoom);

export default userRouter;
