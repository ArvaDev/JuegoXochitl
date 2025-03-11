import { Router } from "express";
import { createUser, getUsers } from "./user.control";

const userRouter = Router();

userRouter.post("/users", createUser);
userRouter.get("/users", getUsers);

export default userRouter;
