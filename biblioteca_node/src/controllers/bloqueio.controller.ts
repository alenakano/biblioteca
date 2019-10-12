import { Request, Response } from 'express';

import {
    getUsuarioBloqueioDAO,
    updateUsuarioBloqueioDAO,
} from '../infrastructure/usuariosDAO';

import HttpException from '../exceptions/httpException';
import ValidationException from '../exceptions/validationException';

import { NextFunction } from 'connect';

export async function getBloqueioUsuario(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        return res.json(await getUsuarioBloqueioDAO(req.params.cpf));
    } catch (error) {
        next(new HttpException(404, 'Deu ruim'));
    }
}

export async function updateBloqueioUsuario(req: Request, res: Response, next: NextFunction) {
    try {
        const updateQueryResult = await updateUsuarioBloqueioDAO(req);
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
        const id: string = req.params.cpf;
        // testando criação de outras exceptions
        next(new ValidationException(id));
    }
}
