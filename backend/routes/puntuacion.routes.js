import { Router } from 'express';
import { agregarNuevoScore, mostrarPuntuaciones, eliminarScore } from '../controllers/puntuacion.controller.js';

const router = Router();

router.get('/scores', mostrarPuntuaciones);

router.put('/new-score', agregarNuevoScore);

router.delete('/score', eliminarScore);

export default router;
