import { Request, Response } from 'express';

import {
    pesquisaAtrasosDAO,
    pesquisaBloqueiosDAO,
    pesquisaEmprestimosDAO
} from '../infrastructure/relatoriosDAO';

import HttpException from '../exceptions/httpException';

import { NextFunction } from 'connect';

const fs = require('fs');
const pdf = require('html-pdf');
const path = require ('path');
const templates = require('../templates/recibos');


export async function pesquisarEmprestimos(req: Request, res: Response, next: NextFunction): Promise<any> {

    /* PARA GERAR TABELA PDF
        let imgSrc = path.join(__dirname, '..', '/book.png');
        imgSrc = path.normalize('file://' + imgSrc);

        const options = {
            format: 'A4',
            footer: {
                height: '12mm'
            },
            header: {
                height: '35mm',
                contents: `
                <h2>Relatório Biblioteca XPTO</h2>
                    <table style="font-family: arial, sans-serif; table-layout: fixed; border-collapse: collapse; width: 100%;">
                    <tr>
                        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Biblioteca</th>
                        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Nome</th>
                        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Quantidade</th>
                    </tr>
                    </table>
                `
            },
            border: {
                left: '10mm',
                right: '10mm',
            }
        };
        let text = '';
        for (let i = 0; i <= 100; i++ ) {
            text = text + `
            <tr>
            <td>${i}A</td>
            <td>${i}B</td>
            <td>${i}C</td>
            </tr>
          `;
        }
        const obj = templates.pdfTesteLista(text);
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

    try {
        return res.json(await pesquisaEmprestimosDAO());
    } catch (error) {
        next(new HttpException(404, 'Deu ruim'));
    }
}

export async function pesquisarAtrasos(req: Request, res: Response, next: NextFunction): Promise<any> {

    /* PARA GERAR TABELA PDF
        let imgSrc = path.join(__dirname, '..', '/book.png');
        imgSrc = path.normalize('file://' + imgSrc);

        const options = {
            format: 'A4',
            footer: {
                height: '12mm'
            },
            header: {
                height: '35mm',
                contents: `
                <h2>Relatório Biblioteca XPTO</h2>
                    <table style="font-family: arial, sans-serif; table-layout: fixed; border-collapse: collapse; width: 100%;">
                    <tr>
                        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Empresa</th>
                        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Livros</th>
                        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Editoras</th>
                    </tr>
                    </table>
                `
            },
            border: {
                left: '10mm',
                right: '10mm',
            }
        };
        let text = '';
        for (let i = 0; i <= 100; i++ ) {
            text = text + `
            <tr>
            <td>${i + 1000}O</td>
            <td>${i + 1000}P</td>
            <td>${i + 1000}A</td>
            </tr>
          `;
        }
        const obj = templates.pdfTesteLista(text);
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

    try {
        return res.json(await pesquisaAtrasosDAO());
    } catch (error) {
        next(new HttpException(404, 'Deu ruim'));
    }
}

export async function pesquisarBloqueios(req: Request, res: Response, next: NextFunction): Promise<any> {

    /* PARA GERAR TABELA PDF
        let imgSrc = path.join(__dirname, '..', '/book.png');
        imgSrc = path.normalize('file://' + imgSrc);

        const options = {
            format: 'A4',
            footer: {
                height: '12mm'
            },
            header: {
                height: '35mm',
                contents: `
                <h2>Relatório Biblioteca XPTO</h2>
                    <table style="font-family: arial, sans-serif; table-layout: fixed; border-collapse: collapse; width: 100%;">
                    <tr>
                        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Prova</th>
                        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Conceito</th>
                        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Teste</th>
                    </tr>
                    </table>
                `
            },
            border: {
                left: '10mm',
                right: '10mm',
            }
        };

        let text = '';
        for (let i = 0; i <= 100; i++ ) {
            text = text + `
            <tr>
            <td>${i + 201}X</td>
            <td>${i + 2039}Y</td>
            <td>${i + 2039892}ZÍ</td>
            </tr>
          `;
        }
        const obj = templates.pdfTesteLista(text);
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

    try {
        return res.json(await pesquisaBloqueiosDAO());
    } catch (error) {
        next(new HttpException(404, 'Deu ruim'));
    }
}
