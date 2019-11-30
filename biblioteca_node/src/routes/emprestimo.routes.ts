import { Router } from 'express';
import { getEmprestimo, createEmprestimo, deleteEmprestimo, updateEmprestimo } from '../controllers/emprestimo.controller';

const router = Router();

router.route('/')
    .post(createEmprestimo);

router.route('/:cpf/:codExemplar')
    .delete(deleteEmprestimo)
    .put(updateEmprestimo);

router.route('/:cpf/:codExemplar')
    .get(getEmprestimo);

export default router;
