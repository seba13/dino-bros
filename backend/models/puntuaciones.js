import mongoose from "mongoose"

const Schema = mongoose.Schema

const puntuacionSchema = new Schema({

    nombre: {type: String},
    puntuacion: {type: Number},
    id: {type: Number},
    fecha: {type: Date},
})

const Puntuacion = mongoose.model("Puntuacion", puntuacionSchema)

export { Puntuacion }
