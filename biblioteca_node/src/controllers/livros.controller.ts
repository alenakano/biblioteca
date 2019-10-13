import { Request, Response } from 'express';

import {
    createLivrosDAO,
    getLivroDAO,
    getLivrosDAO,
    deleteLivrosDAO,
    updateLivrosDAO,
} from '../infrastructure/livrosDAO';

import HttpException from '../exceptions/httpException';
import ValidationException from '../exceptions/validationException';
import { resolveError } from '../exceptions/resolveError';

import { NextFunction } from 'connect';

export async function getLivros(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        return res.json(await getLivrosDAO());
    } catch (error) {
        next(new HttpException(404, 'Deu ruim'));
    }
}

export async function createLivro(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const createQueryResult = await createLivrosDAO(req);
        if (createQueryResult[0].affectedRows) {
            return res.json ({
                message: 'Livro cadastrado com sucesso.'
            });
        } else {
            return res.json ({
                message: 'Livro não cadastrado. Verifique.'
            });
        }

    } catch (error) {
        resolveError(error, res);
    }
}

export async function getLivro(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        return res.json(await getLivroDAO(req.params.livroId));
    } catch (error) {
        next(new HttpException(404, 'Deu ruim'));
    }
}

export async function deleteLivro(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const deleteQueryResult = await deleteLivrosDAO(req.params.livroId);
        if (deleteQueryResult[0].affectedRows) {
            return res.json ({
                message: 'Livro removido com sucesso'
            });
        } else {
            return res.json ({
                message: 'Nenhum livro encontrado para ser removido'
            });
        }
    } catch (error) {
        next(new HttpException(404, 'Deu ruim'));
    }
}

export async function updateLivro(req: Request, res: Response, next: NextFunction) {
    try {
        const updateQueryResult = await updateLivrosDAO(req);
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
        const id: string = req.params.livroId;
        // testando criação de outras exceptions
        next(new ValidationException(id));
    }
}
