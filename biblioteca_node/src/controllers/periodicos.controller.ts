import { Request, Response } from 'express';

import {
    createPeriodicosDAO,
    getPeriodicoDAO,
    getPeriodicosDAO,
    deletePeriodicosDAO,
    updatePeriodicosDAO,
} from '../infrastructure/periodicosDAO';

import HttpException from '../exceptions/httpException';
import ValidationException from '../exceptions/validationException';
import { resolveError } from '../exceptions/resolveError';

import { NextFunction } from 'connect';

export async function getPeriodicos(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        return res.json(await getPeriodicosDAO());
    } catch (error) {
        next(new HttpException(404, 'Deu ruim'));
    }
}

export async function createPeriodico(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const createQueryResult = await createPeriodicosDAO(req);
        if (createQueryResult[0].affectedRows) {
            return res.json ({
                message: 'Periódico cadastrado com sucesso.'
            });
        } else {
            return res.json ({
                message: 'Periódico não cadastrado. Tente novamente mais tarde.'
            });
        }

    } catch (error) {
        resolveError(error, res);
    }
}

export async function getPeriodico(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        return res.json(await getPeriodicoDAO(req.params.periodicoId));
    } catch (error) {
        next(new HttpException(404, 'Deu ruim'));
    }
}

export async function deletePeriodico(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const deleteQueryResult = await deletePeriodicosDAO(req.params.periodicoId);
        if (deleteQueryResult[0].affectedRows) {
            return res.json ({
                message: 'Periódico removido com sucesso'
            });
        } else {
            return res.json ({
                message: 'Nenhum periódico encontrado para ser removido'
            });
        }
    } catch (error) {
        next(new HttpException(404, 'Deu ruim'));
    }
}

export async function updatePeriodico(req: Request, res: Response, next: NextFunction) {
    try {
        const updateQueryResult = await updatePeriodicosDAO(req);
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
        const id: string = req.params.periodicoId;
        // testando criação de outras exceptions
        next(new ValidationException(id));
    }
}
