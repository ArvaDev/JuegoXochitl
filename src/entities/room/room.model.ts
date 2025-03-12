import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../user/user.model";

interface IRoom extends Document {
    id_room: string;
    bot: null;
    messages: string[]
    users: IUser[];
    master: IUser;
}

const RoomSchema = new Schema<IRoom>({
    id_room: {
        type: String,
        required: true,
        unique: true
    },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    messages: [{type: String}],
    master: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const RoomModel = mongoose.model<IRoom>("Room", RoomSchema);
export default RoomModel;
