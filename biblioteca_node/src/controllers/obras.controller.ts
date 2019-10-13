import { Request, Response } from 'express';

import {
    pesquisaObrasDAO,
    emprestaObrasDAO,
} from '../infrastructure/obrasDAO';

import HttpException from '../exceptions/httpException';

import { NextFunction } from 'connect';

export async function pesquisarObras(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        return res.json(await pesquisaObrasDAO(req));
    } catch (error) {
        next(new HttpException(404, 'Deu ruim'));
    }
}

export async function emprestarLivros(req: Request, res: Response, next: NextFunction): Promise<any> {
    // try {
    //     const createQueryResult = await emprestaObrasDAO(req);
    //     if (createQueryResult[0].affectedRows) {
    //         return res.json ({
    //             message: 'Livro cadastrado com sucesso.'
    //         });
    //     } else {
    //         return res.json ({
    //             message: 'Livro não cadastrado. Verifique.'
    //         });
    //     }

    // } catch (error) {
    //     resolveError(error, res);
    // }
}

export async function devolverLivros(req: Request, res: Response, next: NextFunction): Promise<any> {
    // try {
    //     const createQueryResult = await emprestaObrasDAO(req);
    //     if (createQueryResult[0].affectedRows) {
    //         return res.json ({
    //             message: 'Livro cadastrado com sucesso.'
    //         });
    //     } else {
    //         return res.json ({
    //             message: 'Livro não cadastrado. Verifique.'
    //         });
    //     }

    // } catch (error) {
    //     resolveError(error, res);
    // }
}
