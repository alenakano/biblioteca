import { Router } from 'express';
import { getLivros, createLivro, getLivro, deleteLivro, updateLivro } from '../controllers/livros.controller';

const router = Router();

router.route('/')
    .get(getLivros)
    .post(createLivro);

router.route('/:livroId')
    .get(getLivro)
    .delete(deleteLivro)
    .put(updateLivro);

export default router;
