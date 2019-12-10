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

export async function createEmprestimoDAO(req: Request, next: NextFunction): Promise<any> {
    const newEmprestimo: Emprestimo = req.body;
    const cpf = req.params.cpf;
    const connCreateEmprestimo = await openConnection();
    let [rows, fields] = await connCreateEmprestimo.execute(
        'SELECT * FROM usuario WHERE CPF = ?',
        [cpf]
    );

    if (rows[0].idUsuario) {
        if (rows[0].status == 1) {
            next(new HttpException(494, 'Usuário bloqueado para emprestar'));
            return;
        }

        newEmprestimo.idUsuario = rows[0].idUsuario;

        [rows, fields] = await connCreateEmprestimo.execute(
            'SELECT * FROM obra WHERE identificador = ?',
            [newEmprestimo.identificador]
        );
        newEmprestimo.idObra = rows[0].idObra;

        [rows, fields] = await connCreateEmprestimo.execute(
            'SELECT * FROM exemplar WHERE idObra = ? AND numExemplar = ?',
            [newEmprestimo.idObra, newEmprestimo.numExemplar]
        );
        newEmprestimo.idExemplar = rows[0].idExemplar;

        [rows, fields] = await connCreateEmprestimo.execute(
            'SELECT * FROM emprestimo WHERE idExemplar = ? AND idUsuario = ?',
            [newEmprestimo.idExemplar, newEmprestimo.idUsuario ]
        );

        if (rows.length) {
            newEmprestimo.idEmprestimo = rows[0].idEmprestimo;
            const query = 'UPDATE emprestimo SET status = 1 WHERE idEmprestimo = ?';
            let createEmprestimo = await connCreateEmprestimo.query(query,
                [newEmprestimo.idEmprestimo]);
            createEmprestimo = await connCreateEmprestimo
                .query('UPDATE exemplar SET status = 1 WHERE idExemplar = ?', [newEmprestimo.idExemplar]);
            return createEmprestimo;
        } else {
            const query = 'INSERT INTO emprestimo (idExemplar, idUsuario, dataEmprestimo, dataPrevisao) VALUES (?, ?, ?, ?)';
            [rows, fields] = await connCreateEmprestimo.execute(query,
                [newEmprestimo.idExemplar, newEmprestimo.idUsuario, newEmprestimo.dataEmprestimo, newEmprestimo.dataPrevisao]);

            if (rows. affectedRows == 1) {
                const createEmprestimo = await connCreateEmprestimo
                    .query('UPDATE exemplar SET status = 1 WHERE idExemplar = ?', [newEmprestimo.idExemplar]);
                return createEmprestimo;
            } else {
                next(new HttpException(495, 'Empréstimo não efetuado'));
            }
        }
    }
}

export async function updateEmprestimoDAO(req: Request, next: NextFunction): Promise<any> {

    try {
        let devolucao: Emprestimo = req.body;
        const cpf = req.body.CPF;
        const connUpdateEmprestimo = await openConnection();
        let usuario: Usuarios;
        let [rows, fields] = await connUpdateEmprestimo.execute(
            'SELECT * FROM usuario WHERE CPF = ?',
            [cpf]
        );

        if (rows.length) {
            usuario = rows[0];
            devolucao.idUsuario = rows[0].idUsuario;
            [rows, fields] = await connUpdateEmprestimo.execute(
                'SELECT * FROM obra WHERE identificador = ?',
                [devolucao.identificador]
            );
            devolucao.idObra = rows[0].idObra;
            [rows, fields] = await connUpdateEmprestimo.execute(
                'SELECT * FROM exemplar WHERE idObra = ? AND numExemplar = ?',
                [devolucao.idObra, devolucao.numExemplar]
            );
            devolucao.idExemplar = rows[0].idExemplar;
            [rows, fields] = await connUpdateEmprestimo.execute(
                'SELECT * FROM emprestimo WHERE idExemplar = ? AND idUsuario = ?',
                [devolucao.idExemplar, devolucao.idUsuario ]
            );
            if (rows.length) {
                const hoje = new Date();
                devolucao.dataPrevisao = rows[0].dataPrevisao;
                devolucao.idEmprestimo = rows[0].idEmprestimo;
                if (devolucao.dataPrevisao.getTime() > hoje.getTime()) {
                    return updateEmprestimoHandler(connUpdateEmprestimo, devolucao, next);
                } else {
                    const status = 1;
                    const multaDia = new Date();
                    multaDia.setDate(multaDia.getDate() + 7);
                    [rows, fields] = await connUpdateEmprestimo.execute(
                        'UPDATE usuario SET status = ?, dataBloqueio = ?, dataDesbloqueio = ? WHERE CPF = ?',
                        [status, hoje, multaDia, usuario.CPF]
                    );
                    if (rows.affectedRows == 1) {
                        const deleteEmprestimo = updateEmprestimoHandler(connUpdateEmprestimo, devolucao, next);
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

async function updateEmprestimoHandler(connUpdateEmprestimo: any, devolucao: Emprestimo, next: any) {
    const query = 'UPDATE emprestimo SET status = ? WHERE idEmprestimo = ?';
    const updateEmprestimo = await connUpdateEmprestimo.query(query,
        [devolucao.status, devolucao.idEmprestimo]);
    if (updateEmprestimo[0]) {
        const changeStatus = await connUpdateEmprestimo
            .query('UPDATE exemplar SET status = 0, dataDevolucao = ? WHERE idExemplar = ?', 
                [devolucao.dataDevolucao, devolucao.idExemplar]);
        if (changeStatus[0]) {
            return changeStatus;
        } else {
            next(new HttpException(404, 'Erro de conexão com base de dados.'));
        }
    } else {
        next(new HttpException(404, 'Erro de conexão com base de dados.'));
    }
}

export async function getEmprestimoDAO(id: string): Promise<any> {
    const getId = id;
    const connGetEmprestimo = await openConnection();
    const getEmprestimo = await connGetEmprestimo.query('SELECT * FROM emprestimo WHERE cpf = ?', [ getId ]);
    return getEmprestimo[0];
}

// export async function updateEmprestimoDAO(req: Request): Promise<any> {
//     const upEmprestimo: Emprestimo = req.body;
//     const upId = req.params.livroId;
//     const upCodExemplar = req.params.codExemplar;
//     const connUpdateEmprestimo = await openConnection();
//     // tslint:disable-next-line: max-line-length
//     const updateEmprestimo = await connUpdateEmprestimo.query('UPDATE emprestimo set ? WHERE cpf = ? AND codExemplar = ?', [upEmprestimo, upId, upCodExemplar]);
//     return updateEmprestimo;
// }
