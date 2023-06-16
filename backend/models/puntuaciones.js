import mongoose from 'mongoose';

// evitar que se cree una coleccion con "s" al final
mongoose.pluralize(null);
const Schema = mongoose.Schema;

const puntuacionSchema = new Schema({
	nombre: { type: String },
	puntuacion: { type: Number },
	id: { type: Number },
	fecha: { type: Date },
});

const Puntuacion = mongoose.model('Puntuacion', puntuacionSchema);

export { Puntuacion };
