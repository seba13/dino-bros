import express from 'express';
import path from 'path';
import { error } from 'console';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';

const app = express();
const port = 8888;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(express.static(path.join(__dirname, '../')));

const rutaIndex = path.join(__dirname, 'index.html');

app.get('/', (req, res) => {
	return res.sendFile(rutaIndex);
});

app.put('/new-score', (req, res) => {
	const { dato } = req.body;

	if (agregarNuevoScore(dato)) {
		res.status(200).json({ ...dato, message: 'datos almacenados con exito!' });
	} else {
		res.status(500).json({ Error: 'no se pudo almacenar dato' });
	}
});

app.get('/scores', (req, res) => {
	const jsonData = JSON.parse(fs.readFileSync('./backend/db/hiScore.json', 'utf8'));

	return res.json(jsonData);
});

app.listen(port, '35.160.120.126' || '44.233.151.27' || '34.211.200.85' || '192.168.0.10', () => {
	console.log('servidor escuchando en el puerto ' + port);
});

const agregarNuevoScore = (score) => {
	const jsonData = JSON.parse(fs.readFileSync('./backend/db/hiScore.json', 'utf8'));

	const ultimaClave = Object.keys(jsonData).reduce((elAnterior, elActual, indexActual) => {
		console.log({ elActual });

		return parseInt(elAnterior) > parseInt(elActual) ? elAnterior : elActual;
	});
	console.log({ ultimaClave });

	const nuevoDato = {
		dato: {
			nombre: 'jugador 3',
			puntuacion: 140,
		},
	};

	jsonData[`${+ultimaClave + 1}`] = score;

	try {
		fs.writeFileSync('./backend/db/hiScore.json', JSON.stringify(jsonData), 'utf-8');

		return true;
	} catch (error) {
		return false;
	}
};
