import { Request, Response } from 'express';

import {
    createUsuariosDAO,
    getUsuarioDAO,
    getUsuariosDAO,
    deleteUsuariosDAO,
    updateUsuariosDAO,
} from '../infrastructure/usuariosDAO';

import HttpException from '../exceptions/httpException';
import ValidationException from '../exceptions/validationException';
import { resolveError } from '../exceptions/resolveError';

import { NextFunction } from 'connect';

export async function getUsuarios(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        return res.json(await getUsuariosDAO());
    } catch (error) {
        next(new HttpException(404, 'Deu ruim'));
    }
}

export async function createUsuario(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const createQueryResult = await createUsuariosDAO(req);
        if (createQueryResult[0].affectedRows) {
            return res.json ({
                message: 'Usuário cadastrado com sucesso.'
            });
        } else {
            return res.json ({
                message: 'Usuário não cadastrado. Tente novamente mais tarde.'
            });
        }

    } catch (error) {
        resolveError(error, res);
    }
}

export async function getUsuario(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        return res.json(await getUsuarioDAO(req.params.cpf));
    } catch (error) {
        next(new HttpException(404, 'Deu ruim'));
    }
}

export async function deleteUsuario(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const deleteQueryResult = await deleteUsuariosDAO(req.params.cpf);
        if (deleteQueryResult[0].affectedRows) {
            return res.json ({
                message: 'Usuário removido com sucesso'
            });
        } else {
            return res.json ({
                message: 'Nenhum usuário encontrado para ser removido'
            });
        }
    } catch (error) {
        next(new HttpException(404, 'Deu ruim'));
    }
}

export async function updateUsuario(req: Request, res: Response, next: NextFunction) {
    try {
        const updateQueryResult = await updateUsuariosDAO(req);
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
