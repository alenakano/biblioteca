import { Request, Response } from 'express';

import {
    createPostsDAO,
    getPostDAO,
    getPostsDAO,
    deletePostsDAO,
    updatePostsDAO,
} from '../infrastructure/postsDAO';

import HttpException from '../exceptions/httpException';
import ValidationException from '../exceptions/validationException';

import { NextFunction } from 'connect';

export async function getPosts(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        return res.json(await getPostsDAO());
    } catch (error) {
        next(new HttpException(404, 'Deu ruim'));
    }
}

export async function createPost(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const createQueryResult = await createPostsDAO(req);
        if (createQueryResult[0].affectedRows) {
            return res.json ({
                message: 'POST CREATED'
            });
        } else {
            return res.json ({
                message: 'POST NOT CREATED'
            });
        }

    } catch (error) {
        next(new HttpException(404, 'Deu ruim'));
    }
}

export async function getPost(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        return res.json(await getPostDAO(req.params.postId));
    } catch (error) {
        next(new HttpException(404, 'Deu ruim'));
    }
}

export async function deletePost(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const deleteQueryResult = await deletePostsDAO(req.params.postId);
        if (deleteQueryResult[0].affectedRows) {
            return res.json ({
                message: 'POST DELETED'
            });
        } else {
            return res.json ({
                message: 'NO POST DELETED'
            });
        }
    } catch (error) {
        next(new HttpException(404, 'Deu ruim'));
    }
}

export async function updatePost(req: Request, res: Response, next: NextFunction) {
    try {
        const updateQueryResult = await updatePostsDAO(req);
        if (updateQueryResult[0].affectedRows) {
            return res.json ({
                message: 'POST UPDATED'
            });
        } else {
            return res.json ({
                message: 'NO POSTS UPDATED'
            });
        }

    } catch (error) {
        const id: string = req.params.postId;
        // testando criação de outras exceptions
        next(new ValidationException(id));
    }
}
