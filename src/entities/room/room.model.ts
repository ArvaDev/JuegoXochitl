import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../user/user.model";

interface IRoom extends Document {
    id_room: string;
    roomName: string;
    bot: null;
    users: IUser[];
    master: IUser;
}

const RoomSchema = new Schema<IRoom>({
    id_room: {
        type: String,
        required: true,
        unique: true
    },
    roomName: {type: String, required: true},
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    master: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const RoomModel = mongoose.model<IRoom>("Room", RoomSchema);
export default RoomModel;
