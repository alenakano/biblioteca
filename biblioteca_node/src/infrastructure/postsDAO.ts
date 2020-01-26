import { connect } from '../infrastructure/database';
import { Pool } from 'mysql2/promise';
import { Request } from 'express';

import { Post } from '../interfaces/post.interface';

async function openConnection(): Promise<Pool> {
    return await connect();
}

export async function getPostsDAO(): Promise<any> {
    const connGetPosts = await openConnection();
    const getPosts = await connGetPosts.query('SELECT * FROM posts');
    return getPosts[0];
}

export async function createPostsDAO(req: Request): Promise<any> {
    const newPost: Post = req.body;
    const connCreatePosts = await openConnection();
    const createPosts = await connCreatePosts.query('INSERT INTO posts SET ?', [ newPost ]);
    return createPosts;
}

export async function deletePostsDAO(id: string): Promise<any> {
    const deleteId = id;
    const connDeletePosts = await openConnection();
    const deletePosts = await connDeletePosts.query('DELETE FROM posts WHERE id = ?', [ deleteId ]);
    return deletePosts;
}

export async function getPostDAO(id: string): Promise<any> {
    const getId = id;
    const connGetPosts = await openConnection();
    const getPost = await connGetPosts.query('SELECT * FROM posts WHERE id = ?', [ getId ]);
    return getPost[0];
}

export async function updatePostsDAO(req: Request): Promise<any> {
    const upPost: Post = req.body;
    const upId = req.params.postId;
    const connUpdatePosts = await openConnection();
    const updatePosts = await connUpdatePosts.query('UPDATE posts set ? WHERE id = ?', [upPost, upId]);
    return updatePosts;
}