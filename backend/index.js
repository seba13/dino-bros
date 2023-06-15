import express from 'express';
import path from 'path';
import { error } from 'console';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';
import * as dotenv from 'dotenv';
import router from './routes/puntuacion.routes.js';

dotenv.config({ path: './.env' });

const app = express();
const port = process.env.PORT || 8888;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(express.static(path.join(__dirname, '../')));

app.use(router);

const rutaIndex = path.join(__dirname, 'index.html');

app.get('/', (req, res) => {
	return res.sendFile(rutaIndex);
});

app.listen(port, () => {
	console.log('servidor escuchando en el puerto ' + port);
});
