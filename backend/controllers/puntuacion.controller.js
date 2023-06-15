import { Puntuacion } from '../models/puntuaciones.js';

import { establecerConexion } from '../db/db.js';

export const agregarNuevoScore = async (req, res) => {
	try {
		await establecerConexion();
		const { id: ultimoId = 0 } = (await Puntuacion.findOne({}).sort({ id: 'desc' })) || {};

		console.log({ ultimoId });

		const { nombre, puntuacion, fecha } = req.body;

		const id = ultimoId + 1;

		console.log({ nombre });

		const nuevoJugador = new Puntuacion({
			nombre,
			puntuacion,
			id,
			fecha,
		});

		await nuevoJugador.save();

		res.status(200).json({ success: true, mensaje: 'Puntuación agregada con éxito' });
	} catch (error) {
		console.log(error);

		res.status(500).json({ success: false, mensaje: 'Error al guardar puntuación' } + error.message);
	}
};

export const mostrarPuntuaciones = async (req, res) => {
	try {
		await establecerConexion();
		const puntuaciones = await Puntuacion.find({}).sort({ puntuacion: 'desc' }).lean();

		console.log('entra en mostrarPuntuaciones');

		return res.json({ success: true, puntuaciones });
	} catch (error) {
		return res.status(500).json({ success: false, mensaje: 'Error al obtener las puntuaciones ' + error.message });
	}
};

export const eliminarScore = async (req, res) => {
	try {
		await establecerConexion();

		const { id } = req.body;

		let eliminado = await Puntuacion.findByIdAndDelete(id);

		if (eliminado) {
			return res.json({ success: true, mensaje: 'puntuación eliminada con éxito' });
		} else {
			return res.status(404).json({ success: false, mensaje: 'No se pudo eliminar, id no encontrado' });
		}
	} catch (error) {
		return res.status(500).json({ success: false, mensaje: 'No se pudo eliminar puntuacion ' + error.message });
	}
};
