import WebSocket, { WebSocketServer } from "ws";
import UserModel from "../entities/user/user.model";
import RoomModel from "../entities/room/room.model";

export default function webSocket() {
    const PORT = 8080;
    const wss = new WebSocketServer({ port: PORT });

    console.log(`Web-Socket corriendo en puerto ${PORT}`)
    wss.on('connection', (ws) => {
        console.log('Cliente conectado');
        ws.on('message', async (data) => {
            console.log(data.toString())
        });

        ws.on('close', () => console.log('Cliente desconectado'));
    });

}