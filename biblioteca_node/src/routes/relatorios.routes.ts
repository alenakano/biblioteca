import { Router } from 'express';
import { pesquisarAtrasos, pesquisarBloqueios, pesquisarEmprestimos } from '../controllers/relatorios.controller';

const router = Router();

router.route('/livros-emprestados')
    .get(pesquisarEmprestimos);

router.route('/livros-atrasados')
    .get(pesquisarAtrasos);

router.route('/usuarios-bloqueados')
    .get(pesquisarBloqueios);

export default router;
