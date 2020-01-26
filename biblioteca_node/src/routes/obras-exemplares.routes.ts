import { Router } from 'express';
import {
    cadastrarExemplar,
    pesquisarObras,
    getExemplar,
    getObras,
    createObra,
    getObra,
    deleteObra,
    updateObra,
    updateExemplar
} from '../controllers/obras-exemplares.controller';

const router = Router();

router.route('/pesquisas/:obraNome/:obraTipo')
    .get(pesquisarObras);

router.route('/')
    .get(getObras)
    .post(createObra);

router.route('/exemplares/:idObra')
    .get(getExemplar);

router.route('/exemplar/:idExemplar')
    .put(updateExemplar);


router.route('/cadastrarExemplar/:autenticador')
    .post(cadastrarExemplar);

router.route('/:obraId')
    .get(getObra)
    .put(updateObra);


export default router;
