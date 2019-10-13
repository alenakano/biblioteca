import { Router } from 'express';
import { pesquisarObras, devolverLivros, emprestarLivros } from '../controllers/obras.controller';

const router = Router();

router.route('/pesquisas/:obraNome/:obraTipo')
    .get(pesquisarObras);

router.route('/emprestimos/:obraNome/:obraTipo/:idObra')
    .post(emprestarLivros);

export default router;
