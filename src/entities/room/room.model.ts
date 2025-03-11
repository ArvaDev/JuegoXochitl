import mongoose, { Schema, Document } from "mongoose";

interface IRoom extends Document {
    id_room: string;
    users: mongoose.Types.ObjectId[];
    master: mongoose.Types.ObjectId;
}

const RoomSchema = new Schema<IRoom>({
    id_room: {
        type: String,
        required: true,
        unique: true
    },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    master: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const RoomModel = mongoose.model<IRoom>("Room", RoomSchema);
export default RoomModel;
