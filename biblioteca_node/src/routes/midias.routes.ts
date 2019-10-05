import { Router } from 'express';
import { getMidias, createMidia, getMidia, deleteMidia, updateMidia } from '../controllers/midias.controller';

const router = Router();

router.route('/')
    .get(getMidias)
    .post(createMidia);

router.route('/:midiaId')
    .get(getMidia)
    .delete(deleteMidia)
    .put(updateMidia);

export default router;
