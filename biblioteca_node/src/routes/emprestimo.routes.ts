import { Router } from 'express';
import { getEmprestimo, createEmprestimo, updateEmprestimo } from '../controllers/emprestimo.controller';

const router = Router();

router.route('/:cpf')
    .post(createEmprestimo);

router.route('/')
    .put(updateEmprestimo);

// router.route('/:cpf/:idExemplar')
//     .put(updateEmprestimo);

router.route('/:cpf/:idExemplar')
    .get(getEmprestimo);

export default router;
