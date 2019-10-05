import { Request, Response } from 'express';

import {
    createMidiasDAO,
    getMidiaDAO,
    getMidiasDAO,
    deleteMidiasDAO,
    updateMidiasDAO,
} from '../infrastructure/midiasDAO';

import HttpException from '../exceptions/httpException';
import ValidationException from '../exceptions/validationException';
import { resolveError } from '../exceptions/resolveError';

import { NextFunction } from 'connect';

export async function getMidias(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        return res.json(await getMidiasDAO());
    } catch (error) {
        next(new HttpException(404, 'Deu ruim'));
    }
}

export async function createMidia(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const createQueryResult = await createMidiasDAO(req);
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

export async function getMidia(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        return res.json(await getMidiaDAO(req.params.midiaId));
    } catch (error) {
        next(new HttpException(404, 'Deu ruim'));
    }
}

export async function deleteMidia(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const deleteQueryResult = await deleteMidiasDAO(req.params.midiaId);
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

export async function updateMidia(req: Request, res: Response, next: NextFunction) {
    try {
        const updateQueryResult = await updateMidiasDAO(req);
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
        const id: string = req.params.midiaId;
        // testando criação de outras exceptions
        next(new ValidationException(id));
    }
}
