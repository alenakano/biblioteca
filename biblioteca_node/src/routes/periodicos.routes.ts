import { Router } from 'express';
import { getPeriodicos, createPeriodico, getPeriodico, deletePeriodico, updatePeriodico } from '../controllers/periodicos.controller';

const router = Router();

router.route('/')
    .get(getPeriodicos)
    .post(createPeriodico);

router.route('/:periodicoId')
    .get(getPeriodico)
    .delete(deletePeriodico)
    .put(updatePeriodico);

export default router;
