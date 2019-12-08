import { Router } from 'express';
import { getEmprestimo, createEmprestimo, deleteEmprestimo, updateEmprestimo } from '../controllers/emprestimo.controller';

const router = Router();

router.route('/:cpf')
    .post(createEmprestimo);

router.route('/')
    .delete(deleteEmprestimo);

router.route('/:cpf/:idExemplar')
    .put(updateEmprestimo);

router.route('/:cpf/:idExemplar')
    .get(getEmprestimo);

export default router;
