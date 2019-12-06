import { Router } from 'express';
import {
    pesquisarObras,
    devolverObras,
    emprestarObras,
    getObras,
    createObra,
    getObra,
    deleteObra,
    updateObra
} from '../controllers/obras.controller';

const router = Router();

router.route('/pesquisas/:obraNome/:obraTipo')
    .get(pesquisarObras);

router.route('/emprestimos/')
    .post(emprestarObras)
    .put(devolverObras);

router.route('/')
    .get(getObras)
    .post(createObra);

router.route('/:obraId')
    .get(getObra)
    .delete(deleteObra)
    .put(updateObra);

export default router;
