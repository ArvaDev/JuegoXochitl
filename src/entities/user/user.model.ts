import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    user_id: string;
    name: string;
    score: number;
}

const UserSchema = new Schema<IUser>({
    user_id: {
        type: String,
        required: true,
        unique: true},
    name: { type: String, required: true },
    score: { type: Number, required: true },
})

const UserModel = mongoose.model<IUser>("User", UserSchema);
export default UserModel;