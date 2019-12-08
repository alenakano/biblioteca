import { Router } from 'express';
import {
    cadastrarExemplar,
    pesquisarObras,
    getExemplar,
    getObras,
    createObra,
    getObra,
    deleteObra,
    updateObra
} from '../controllers/obras-exemplares.controller';

const router = Router();

router.route('/pesquisas/:obraNome/:obraTipo')
    .get(pesquisarObras);

router.route('/')
    .get(getObras)
    .post(createObra);

router.route('/exemplares/:idObra')
    .get(getExemplar);

router.route('/cadastrarExemplar')
    .post(cadastrarExemplar);

router.route('/:obraId')
    .get(getObra)
    .delete(deleteObra)
    .put(updateObra);

export default router;
