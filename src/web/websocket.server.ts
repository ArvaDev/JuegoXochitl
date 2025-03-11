import WebSocket, { WebSocketServer } from "ws";

export default function webSocket() {
    const PORT = 8080;
    const wss = new WebSocketServer({ port: PORT });

    console.log(`Web-Socket corriendo en puerto ${PORT}`)
    wss.on('connection', (ws) => {
        console.log('Cliente conectado');

        ws.on('message', (message) => {
            console.log(`Mensaje recibido: ${message}`);
    
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(message.toString());
                }
            });
        });

        ws.on('close', () => console.log('Cliente desconectado'));
    });

}