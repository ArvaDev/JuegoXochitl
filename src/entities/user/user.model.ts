import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    answers: string[];
    score: number;
}

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    answers: {type: [String]},
    score: { type: Number, required: true },
})

const UserModel = mongoose.model<IUser>("User", UserSchema);
export default UserModel;