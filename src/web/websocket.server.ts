import WebSocket, { WebSocketServer } from "ws";
import UserModel from "../entities/user/user.model";
import RoomModel from "../entities/room/room.model";

const rooms: Record<string, WebSocket[]> = {}

export default function webSocket() {
    const PORT = 8080;
    const wss = new WebSocketServer({ port: PORT });

    console.log(`Web-Socket corriendo en puerto ${PORT}`)
    wss.on('connection', (ws) => {
        console.log('Cliente conectado');

        let userRoom: string | null = null

        ws.on('message', async (data) => {
            try {
                const message = JSON.parse(data.toString());
                if (message.type === "join") {
                    const { user_id, room_id } = message
                    const user = await UserModel.findOne({ user_id });
                    if (!user) {
                        ws.send(JSON.stringify({ error: "Usuario no encontrado" }))
                        return
                    }

                    const room = await RoomModel.findOne({ id_room: room_id })
                    if (!room) {
                        ws.send(JSON.stringify({ error: "Sala no encontrada" }))
                        return
                    }

                    userRoom = room_id;
                    if (!rooms[room_id]) {
                        rooms[room_id] = [];
                    }
                    rooms[room_id].push(ws);
                    console.log(`Usuario ${user_id} unido a la sala ${room_id}`);

                    ws.send(JSON.stringify({ message: `Unido a la sala ${room_id}` }));
                }
                
                else if (message.type === "message") {
                    const { room_id, sender, content } = message;
    
                    if (!rooms[room_id]) return;
    
                    // Guardar mensaje en la base de datos
                    await RoomModel.updateOne(
                        { id_room: room_id },
                        { $push: { messages: { sender, content, timestamp: new Date() } } }
                    );
    
                    // Enviar mensaje a todos los usuarios en la sala
                    rooms[room_id].forEach(client => {
                        if (client.readyState === WebSocket.OPEN) {
                            client.send(JSON.stringify({ sender, content, timestamp: new Date() }));
                        }
                    });
                }

            } catch (error) {
                console.error(error)
            }
        });

        ws.on('close', () => console.log('Cliente desconectado'));
    });

}