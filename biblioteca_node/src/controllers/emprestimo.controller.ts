import { Request, Response } from 'express';

import {
    createEmprestimoDAO,
    getEmprestimoDAO,
    deleteEmprestimoDAO,
    updateEmprestimoDAO,
} from '../infrastructure/EmprestimoDAO';

import HttpException from '../exceptions/httpException';
import ValidationException from '../exceptions/validationException';
import { resolveError } from '../exceptions/resolveError';

import { NextFunction } from 'connect';
import { Emprestimo } from '../interfaces/emprestimo.interface';
const fs = require('fs');
const pdf = require('html-pdf');
const path = require ('path');
const templates = require('../templates/recibos');

function parseDate(date: string): string {
    const parts = date.toString().split('-');
    return (
        (parts[2].substring(0, 2)) + '/' +
        (Number(parts[1])).toString() + '/' +
        (parts[0])
    );
}

function autenticador(dados: Emprestimo): string {
    return 'teste';
    // return Buffer.from(dados.cpf + dados.idExemplar).toString('base64');
}

export async function createEmprestimo(req: Request, res: Response, next: NextFunction): Promise<any> {

    try {
        const createQueryResult = await createEmprestimoDAO(req);
        /* PARA GERAR O PDF
            const dadosEmprestimo: Emprestimo = req.body;
            dadosEmprestimo.dateEmprestimo = parseDate(dadosEmprestimo.dateEmprestimo);
            dadosEmprestimo.dateDevolucao = parseDate(dadosEmprestimo.dateDevolucao);

            let imgSrc = path.join(__dirname, '..', '/book.png');
            imgSrc = path.normalize('file://' + imgSrc);

            const auth = autenticador(dadosEmprestimo);

            const options = {
                format: 'A5',
            };
            const obj = templates.pdfReciboEmprestimo(dadosEmprestimo, imgSrc, auth);
            pdf.create(obj, options).toStream((err: any, stream: any) => {
                const file = stream.path;
                res.setHeader('Content-type', 'application/pdf');
                res.setHeader('Content-disposition', 'attachment; filename=' + file);
                // res.setHeader('Access-Control-Expose-Headers', 'Location');
                res.download(file, (erro: any) => {
                    if (erro) {
                        console.log(erro);
                    } else {
                        console.log('Efetuado com sucesso');
                    }
                });
            });
        */

        if (createQueryResult[0].affectedRows) {
            return res.json ({
                message: 'Emprestimo cadastrado com sucesso.'
            });
        } else {
            return res.json ({
                message: 'Emprestimo não cadastrado. Verifique.'
            });
        }

    } catch (error) {
        resolveError(error, res);
    }
}

export async function getEmprestimo(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        return res.json(await getEmprestimoDAO(req.params.cpf));
    } catch (error) {
        next(new HttpException(404, 'Deu ruim'));
    }
}

export async function deleteEmprestimo(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const deleteQueryResult = await deleteEmprestimoDAO(req);
        if (deleteQueryResult[0].affectedRows) {
            return res.json ({
                message: 'Emprestimo removido com sucesso'
            });
        } else {
            return res.json ({
                message: 'Nenhum Emprestimo encontrado para ser removido'
            });
        }
    } catch (error) {
        next(new HttpException(404, 'Deu ruim'));
    }
}

export async function updateEmprestimo(req: Request, res: Response, next: NextFunction) {
    try {
        const updateQueryResult = await updateEmprestimoDAO(req);
        if (updateQueryResult[0].affectedRows) {
            return res.json ({
                message: 'Cadastro Atualizado com sucesso.'
            });
        } else {
            return res.json ({
                message: 'Falha ao atualizar.'
            });
        }

    } catch (error) {
        const id: string = req.params.emprestimoId;
        // testando criação de outras exceptions
        next(new ValidationException(id));
    }
}
