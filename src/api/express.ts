import express from 'express';
import cors from 'cors';
import router from './router';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(router);

export default function initApi() {
    app.listen(PORT, () => {
        console.log(`Servidor en puerto ${PORT}`);
    });
}