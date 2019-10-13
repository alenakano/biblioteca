import { Request, Response } from 'express';

import {
    createOutrasDAO,
    getOutraDAO,
    getOutrasDAO,
    deleteOutrasDAO,
    updateOutrasDAO,
} from '../infrastructure/outrasDAO';

import HttpException from '../exceptions/httpException';
import ValidationException from '../exceptions/validationException';
import { resolveError } from '../exceptions/resolveError';

import { NextFunction } from 'connect';

export async function getOutras(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        return res.json(await getOutrasDAO());
    } catch (error) {
        next(new HttpException(404, 'Deu ruim'));
    }
}

export async function createOutra(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const createQueryResult = await createOutrasDAO(req);
        if (createQueryResult[0].affectedRows) {
            return res.json ({
                message: 'Mídia cadastrada com sucesso.'
            });
        } else {
            return res.json ({
                message: 'Mídia não cadastrada. Tente novamente mais tarde.'
            });
        }

    } catch (error) {
        resolveError(error, res);
    }
}

export async function getOutra(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        return res.json(await getOutraDAO(req.params.outraId));
    } catch (error) {
        next(new HttpException(404, 'Deu ruim'));
    }
}

export async function deleteOutra(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const deleteQueryResult = await deleteOutrasDAO(req.params.OutraId);
        if (deleteQueryResult[0].affectedRows) {
            return res.json ({
                message: 'Mídia removido com sucesso'
            });
        } else {
            return res.json ({
                message: 'Nenhum mídia encontrado para ser removido'
            });
        }
    } catch (error) {
        next(new HttpException(404, 'Deu ruim'));
    }
}

export async function updateOutra(req: Request, res: Response, next: NextFunction) {
    try {
        const updateQueryResult = await updateOutrasDAO(req);
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
        const id: string = req.params.OutraId;
        // testando criação de outras exceptions
        next(new ValidationException(id));
    }
}
