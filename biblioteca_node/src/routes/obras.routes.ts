import { Router } from 'express';
import { pesquisarObras, devolverLivros, emprestarObras } from '../controllers/obras.controller';

const router = Router();

router.route('/pesquisas/:obraNome/:obraTipo')
    .get(pesquisarObras);

router.route('/emprestimos/')
    .post(emprestarObras)
    .put(devolverLivros);

export default router;
