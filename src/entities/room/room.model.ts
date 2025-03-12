import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../user/user.model";

interface IMessage {
    sender: mongoose.Schema.Types.ObjectId;
    content: string;
    timestamp: Date;
}

interface IRoom extends Document {
    id_room: string;
    bot: null;
    messages: IMessage[];
    users: IUser[];
    master: IUser;
}

const MessageSchema = new Schema<IMessage>({
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const RoomSchema = new Schema<IRoom>({
    id_room: {
        type: String,
        required: true,
        unique: true
    },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    messages: [MessageSchema],
    master: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const RoomModel = mongoose.model<IRoom>("Room", RoomSchema);
export default RoomModel;
