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

    try {
        const pesquisaEmprestimo = await pesquisaEmprestimosDAO();
        console.log('PESQUISA', pesquisaEmprestimo);
            /* PARA GERAR TABELA PDF */
        const options = {
            format: 'A4',
            footer: {
                height: '12mm'
            },
            header: {
                height: '30mm',
                contents: `
                <h2>Relatório Biblioteca - Exemplares emprestados</h2>
                    <table style="font-family: arial, sans-serif; table-layout: fixed; border-collapse: collapse; width: 100%;">
                    <tr>
                        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">ID Exemplar</th>
                        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">ID Obra</th>
                        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Número do exemplar</th>
                        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Tomo</th>
                        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Título</th>
                        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Autor</th>
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
        pesquisaEmprestimo.forEach( (row: any) => {
            text += "<tr>";
            text += "<td>"+row.idExemplar+"</td>";
            text += "<td>"+row.idObra+"</td>";
            text += "<td>"+row.numExemplar+"</td>";
            text += "<td>"+row.tomo+"</td>";
            text += "<td>"+row.titulo+"</td>";
            text += "<td>"+row.autor+"</td>";
            text += "</tr>";
        });
        const obj = templates.pdfLista(text);
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
    } catch (error) {
        next(new HttpException(404, 'Deu ruim'));
    }
}

export async function pesquisarAtrasos(req: Request, res: Response, next: NextFunction): Promise<any> {

    try {
       const atrasoRelatorio = await pesquisaAtrasosDAO();
       console.log(atrasoRelatorio);
       /* PARA GERAR TABELA PDF */
       const options = {
        format: 'A4',
        footer: {
            height: '12mm'
        },
        header: {
            height: '30mm',
            contents: `
            <h2>Relatório Biblioteca - Exemplares atrasados</h2>
                <table style="font-family: arial, sans-serif; table-layout: fixed; border-collapse: collapse; width: 100%;">
                <tr>
                    <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">ID Exemplar</th>
                    <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">ID Obra</th>
                    <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Número do exemplar</th>
                    <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Tomo</th>
                    <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Autor</th>
                    <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Título</th>
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
       atrasoRelatorio.forEach( (row: any) => {
        text += "<tr>";
        text += "<td>"+row.idExemplar+"</td>";
        text += "<td>"+row.idObra+"</td>";
        text += "<td>"+row.numExemplar+"</td>";
        text += "<td>"+row.tomo+"</td>";
        text += "<td>"+row.autor+"</td>";
        text += "<td>"+row.titulo+"</td>";
        text += "</tr>";
    });
       const obj = templates.pdfLista(text);
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
    } catch (error) {
        next(new HttpException(404, 'Deu ruim'));
    }
}

export async function pesquisarBloqueios(req: Request, res: Response, next: NextFunction): Promise<any> {

    try {
        const bloqueioRelatorio = await pesquisaBloqueiosDAO();
        /* PARA GERAR TABELA PDF */
        const options = {
            format: 'A4',
            footer: {
                height: '12mm'
            },
            header: {
                height: '30mm',
                contents: `
                <h2>Relatório Biblioteca - Usuários bloqueados</h2>
                    <table style="font-family: arial, sans-serif; table-layout: fixed; border-collapse: collapse; width: 100%;">
                    <tr>
                        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">ID Usuário</th>
                        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">CPF</th>
                        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Nome do usuário</th>
                        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">E-mail</th>
                        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Cidade</th>
                        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Data do Bloqueio</th>
                        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Data do Desbloqueio</th>
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
        bloqueioRelatorio.forEach( (row: any) => {
            text += "<tr>";
            text += "<td>"+row.idUsuario+"</td>";
            text += "<td>"+row.CPF+"</td>";
            text += "<td>"+row.nomeUsuario+"</td>";
            text += "<td>"+row.email+"</td>";
            text += "<td>"+row.cidade+"</td>";
            text += "<td>"+row.dataBloqueio+"</td>";
            text += "<td>"+row.dataDesbloqueio+"</td>";
            text += "</tr>";
        });
        const obj = templates.pdfLista(text);
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
    } catch (error) {
        next(new HttpException(404, 'Deu ruim'));
    }
}
