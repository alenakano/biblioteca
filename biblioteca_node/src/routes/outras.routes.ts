import { Router } from 'express';
import { getOutras, createOutra, getOutra, deleteOutra, updateOutra } from '../controllers/outras.controller';

const router = Router();

router.route('/')
    .get(getOutras)
    .post(createOutra);

router.route('/:outraId')
    .get(getOutra)
    .delete(deleteOutra)
    .put(updateOutra);

export default router;
