import { Request, Response } from 'express';

import {
    createObrasDAO,
    createExemplarDAO,
    getExemplarDAO,
    getObraDAO,
    getObrasDAO,
    deleteObrasDAO,
    updateExemplarDAO,
    updateObrasDAO,
    pesquisaObrasDAO,
} from '../infrastructure/obras-exemplaresDAO';

import HttpException from '../exceptions/httpException';

import ValidationException from '../exceptions/validationException';

import { resolveError } from '../exceptions/resolveError';

import { NextFunction } from 'connect';

export async function pesquisarObras(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        return res.json(await pesquisaObrasDAO(req));
    } catch (error) {
        next(new HttpException(404, 'Deu ruim'));
    }
}

export async function cadastrarExemplar(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const createQueryResult = await createExemplarDAO(req);
        if (createQueryResult[0].affectedRows) {
            return res.json ({
                message: 'Exemplar cadastrado com sucesso.'
            });
        } else {
            return res.json ({
                message: 'Exemplar não cadastrado. Verifique.'
            });
        }

    } catch (error) {
        resolveError(error, res);
    }
}

export async function getExemplar(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        return res.json(await getExemplarDAO(req.params.idObra));
    } catch (error) {
        next(new HttpException(404, 'Deu ruim'));
    }
}

export async function getObras(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        return res.json(await getObrasDAO());
    } catch (error) {
        next(new HttpException(404, 'Deu ruim'));
    }
}

export async function createObra(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const createQueryResult = await createObrasDAO(req);
        if (createQueryResult[0].affectedRows) {
            return res.json ({
                message: 'Obra cadastrado com sucesso.'
            });
        } else {
            return res.json ({
                message: 'Obra não cadastrado. Verifique.'
            });
        }

    } catch (error) {
        resolveError(error, res);
    }
}

export async function getObra(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const getObraQueryResult = await getObraDAO(req.params.obraId);
        if (getObraQueryResult[0]) {
            res.json(getObraQueryResult);
        } else {
            next(new HttpException(412, 'Não cadastrado'));
        }
    } catch (error) {
        next(new HttpException(404, 'Deu ruim'));
    }
}

export async function deleteObra(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const deleteQueryResult = await deleteObrasDAO(req.params.obraId);
        if (deleteQueryResult[0].affectedRows) {
            return res.json ({
                message: 'Obra removido com sucesso'
            });
        } else {
            return res.json ({
                message: 'Nenhum Obra encontrado para ser removido'
            });
        }
    } catch (error) {
        next(new HttpException(404, 'Deu ruim'));
    }
}

export async function updateObra(req: Request, res: Response, next: NextFunction) {
    try {
        const updateQueryResult = await updateObrasDAO(req);
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
        const id: string = req.params.ObraId;
        // testando criação de outras exceptions
        next(new ValidationException(id));
    }
}

export async function updateExemplar(req: Request, res: Response, next: NextFunction) {
    try {
        const updateQueryResult = await updateExemplarDAO(req);
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
        const id: string = req.params.idExemplar;
        // testando criação de outras exceptions
        next(new ValidationException(id));
    }
}