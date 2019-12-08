import { connect } from './database';
import { Pool, RowDataPacket } from 'mysql2/promise';
import { Request } from 'express';

import { Emprestimo } from '../interfaces/emprestimo.interface';
import { NextFunction } from 'connect';
import HttpException from '../exceptions/HttpException';
import { Usuarios } from '../interfaces/usuarios.interface';


async function openConnection(): Promise<Pool> {
    return await connect();
}

export async function createEmprestimoDAO(req: Request): Promise<any> {
    const newEmprestimo: Emprestimo = req.body;

    const cpf = req.params.cpf;
    const connCreateEmprestimo = await openConnection();
    let [rows, fields] = await connCreateEmprestimo.execute(
        'SELECT * FROM usuario WHERE CPF = ?',
        [cpf]
    );

    if (rows[0].idUsuario) {
        newEmprestimo.idUsuario = rows[0].idUsuario;
        const query = 'INSERT INTO emprestimo (idExemplar, idUsuario, dataEmprestimo, dataPrevisao) VALUES (?, ?, ?, ?)';
        const createEmprestimo = await connCreateEmprestimo.execute(query,
            [newEmprestimo.idExemplar, newEmprestimo.idUsuario, newEmprestimo.dataEmprestimo, newEmprestimo.dataPrevisao]);
        return createEmprestimo;
    }
}

export async function deleteEmprestimoDAO(req: Request, next: NextFunction): Promise<any> {

    try {

        let devolucao: Emprestimo = req.body;
        const cpf = req.body.CPF;
        const connDeleteEmprestimo = await openConnection();
        let usuario: Usuarios;
        let [rows, fields] = await connDeleteEmprestimo.execute(
            'SELECT * FROM usuario WHERE CPF = ?',
            [cpf]
        );

        if (rows.length) {
            usuario = rows[0];
            devolucao.idUsuario = rows[0].idUsuario;
            [rows, fields] = await connDeleteEmprestimo.execute(
                'SELECT * FROM emprestimo WHERE idExemplar = ? AND idUsuario = ?',
                [ devolucao.idExemplar, devolucao.idUsuario ]
            );
            if (rows.length) {
                const hoje = new Date();
                devolucao = rows[0];
                if (devolucao.dataPrevisao.getTime() > hoje.getTime()) {
                    const query = 'DELETE FROM emprestimo WHERE idEmprestimo = ?';
                    const deleteEmprestimo = await connDeleteEmprestimo.query(query,
                        [devolucao.idEmprestimo]);
                    return deleteEmprestimo;
                } else {
                    const status = 1;
                    const multaDia = new Date();
                    multaDia.setDate(multaDia.getDate() + 7);
                    [rows, fields] = await connDeleteEmprestimo.execute(
                        'UPDATE usuario SET status = ?, dataBloqueio = ?, dataDesbloqueio = ? WHERE CPF = ?',
                        [status, hoje, multaDia, usuario.CPF]
                    );
                    if (rows.affectedRows == 1) {
                        const query = 'DELETE FROM emprestimo WHERE idEmprestimo = ?';
                        const deleteEmprestimo = await connDeleteEmprestimo.query(query,
                        [devolucao.idEmprestimo]);
                        next(new HttpException(492, 'Entrega Efetuada com bloqueio.'));
                    } else {
                        next(new HttpException(493, 'Erro bloqueio.'));
                    }
                }
            } else {
                next(new HttpException(490, 'Nenhum empréstimo encontrado.'));
            }
        } else {
            next(new HttpException(491, 'Nenhum usuário encontrado.'));
        }
    } catch {
        next(new HttpException(404, 'Erro de conexão com base de dados.'));
    }
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
