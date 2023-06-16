import mongoose from 'mongoose';
import { MONGODB_URI } from '../config/config.js';

export const establecerConexion = async () => {
	try {
		const db = await mongoose.connect(MONGODB_URI, { dbName: 'dinoBrosDB' });

		console.log(`Conectado a ${db.connection.name}`);
	} catch (error) {
		console.error(error);
	}

	mongoose.connection.on('connected', () => {
		console.log('Mongoose contectado');
	});

	mongoose.connection.on('disconnected', () => {
		console.log('Mongoose desconectado');
	});
};
