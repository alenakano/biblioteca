import { connect } from './database';
import { Pool } from 'mysql2/promise';
import { Request } from 'express';

import { Emprestimo } from '../interfaces/emprestimo.interface';


async function openConnection(): Promise<Pool> {
    return await connect();
}

export async function createEmprestimoDAO(req: Request): Promise<any> {
    const newEmprestimo: Emprestimo = req.body;
    const connCreateEmprestimo = await openConnection();
    const createEmprestimo = await connCreateEmprestimo.query('INSERT INTO emprestimos SET ?', [ newEmprestimo ]);
    return createEmprestimo;
}

export async function deleteEmprestimoDAO(req: Request): Promise<any> {
    const deleteId = req.params.cpf;
    const deleteCodExemplar = req.params.codExemplar;
    const connDeleteEmprestimo = await openConnection();
    const deleteEmprestimo = await connDeleteEmprestimo.query('DELETE FROM emprestimos WHERE cpf = ? AND codExemplar = ?', [ deleteId, deleteCodExemplar ]);
    return deleteEmprestimo;
}

export async function getEmprestimoDAO(id: string): Promise<any> {
    const getId = id;
    const connGetEmprestimo = await openConnection();
    const getEmprestimo = await connGetEmprestimo.query('SELECT * FROM emprestimos WHERE cpf = ?', [ getId ]);
    return getEmprestimo[0];
}

export async function updateEmprestimoDAO(req: Request): Promise<any> {
    const upEmprestimo: Emprestimo = req.body;
    const upId = req.params.livroId;
    const upCodExemplar = req.params.codExemplar;
    const connUpdateEmprestimo = await openConnection();
    // tslint:disable-next-line: max-line-length
    const updateEmprestimo = await connUpdateEmprestimo.query('UPDATE emprestimo set ? WHERE cpf = ? AND codExemplar = ?', [upEmprestimo, upId, upCodExemplar]);
    return updateEmprestimo;
}
