import { connect } from './database';
import { Pool } from 'mysql2/promise';
import { Request } from 'express';

import { Livros } from '../interfaces/livros.interface';

async function openConnection(): Promise<Pool> {
    return await connect();
}

export async function getLivrosDAO(): Promise<any> {
    const connGetLivros = await openConnection();
    const getLivros = await connGetLivros.query('SELECT * FROM obras');
    return getLivros[0];
}

export async function createLivrosDAO(req: Request): Promise<any> {
    const newLivros: Livros = req.body;
    const connCreateLivros = await openConnection();
    const createLivros = await connCreateLivros.query('INSERT INTO obras SET ?', [ newLivros ]);
    return createLivros;
}

export async function deleteLivrosDAO(id: string): Promise<any> {
    const deleteId = id;
    const connDeleteLivros = await openConnection();
    const deleteLivros = await connDeleteLivros.query('DELETE FROM obras WHERE isbn = ?', [ deleteId ]);
    return deleteLivros;
}

export async function getLivroDAO(id: string): Promise<any> {
    const getId = id;
    const connGetLivros = await openConnection();
    const getLivros = await connGetLivros.query('SELECT * FROM obras WHERE isbn = ?', [ getId ]);
    return getLivros[0];
}

export async function updateLivrosDAO(req: Request): Promise<any> {
    const upLivros: Livros = req.body;
    const upId = req.params.livroId;
    const connUpdateLivros = await openConnection();
    const updateLivros = await connUpdateLivros.query('UPDATE obras set ? WHERE isbn = ?', [upLivros, upId]);
    return updateLivros;
}