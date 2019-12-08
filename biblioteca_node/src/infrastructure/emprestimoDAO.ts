import { connect } from './database';
import { Pool, RowDataPacket } from 'mysql2/promise';
import { Request } from 'express';

import { Emprestimo } from '../interfaces/emprestimo.interface';


async function openConnection(): Promise<Pool> {
    return await connect();
}

export async function createEmprestimoDAO(req: Request): Promise<any> {
    const newEmprestimo: Emprestimo = req.body;
    newEmprestimo.idUsuario = 2;

    const cpf = req.params.cpf;
    const connCreateEmprestimo = await openConnection();
    let [rows, fields] = await connCreateEmprestimo.execute(
        'SELECT * FROM usuario WHERE CPF = ?',
        [cpf]
    );

    if (rows[0].idUsuario) {
        newEmprestimo.idUsuario = rows[0].idUsuario;
        console.log(newEmprestimo)
        const query = 'INSERT INTO emprestimo (idExemplar, idUsuario, dataEmprestimo, dataPrevisao) VALUES (?, ?, ?, ?)';
        const createEmprestimo = await connCreateEmprestimo.execute(query,
            [newEmprestimo.idExemplar, newEmprestimo.idUsuario, newEmprestimo.dataEmprestimo, newEmprestimo.dataPrevisao]);
        return createEmprestimo;
    }
}

export async function deleteEmprestimoDAO(req: Request): Promise<any> {
    const deleteId = req.params.cpf;
    const deleteCodExemplar = req.params.codExemplar;
    const connDeleteEmprestimo = await openConnection();
    const deleteEmprestimo =
        await connDeleteEmprestimo
        .query('DELETE FROM emprestimo WHERE CPF = ? AND codExemplar = ?', 
        [ deleteId, deleteCodExemplar ]);
    return deleteEmprestimo;
}

export async function getEmprestimoDAO(id: string): Promise<any> {
    const getId = id;
    const connGetEmprestimo = await openConnection();
    const getEmprestimo = await connGetEmprestimo.query('SELECT * FROM emprestimo WHERE cpf = ?', [ getId ]);
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
