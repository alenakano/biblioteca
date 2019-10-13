import { Router } from 'express';
import { getBloqueioUsuario, updateBloqueioUsuario } from '../controllers/bloqueio.controller';

const router = Router();

router.route('/:cpf')
    .get(getBloqueioUsuario)
    .put(updateBloqueioUsuario);

export default router;
