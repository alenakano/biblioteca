import { Router } from 'express';
import { getEmprestimo, createEmprestimo, deleteEmprestimo, updateEmprestimo } from '../controllers/emprestimo.controller';

const router = Router();

router.route('/:cpf')
    .post(createEmprestimo);

router.route('/:cpf/:idExemplar')
    .delete(deleteEmprestimo)
    .put(updateEmprestimo);

router.route('/:cpf/:idExemplar')
    .get(getEmprestimo);

export default router;
