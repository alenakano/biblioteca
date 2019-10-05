import { connect } from './database';
import { Pool } from 'mysql2/promise';
import { Request } from 'express';

import { Outras } from '../interfaces/outras.interface';

async function openConnection(): Promise<Pool> {
    return await connect();
}

export async function getOutrasDAO(): Promise<any> {
    const connGetOutras = await openConnection();
    const getOutras = await connGetOutras.query('SELECT * FROM obras');
    return getOutras[0];
}

export async function createOutrasDAO(req: Request): Promise<any> {
    const newOutras: Outras = req.body;
    const connCreateOutras = await openConnection();
    const createOutras = await connCreateOutras.query('INSERT INTO obras SET ?', [ newOutras ]);
    return createOutras;
}

export async function deleteOutrasDAO(id: string): Promise<any> {
    const deleteId = id;
    const connDeleteOutras = await openConnection();
    const deleteOutras = await connDeleteOutras.query('DELETE FROM obras WHERE controlId = ?', [ deleteId ]);
    return deleteOutras;
}

export async function getOutraDAO(id: string): Promise<any> {
    const getId = id;
    const connGetOutras = await openConnection();
    const getOutras = await connGetOutras.query('SELECT * FROM obras WHERE controlId = ?', [ getId ]);
    return getOutras[0];
}

export async function updateOutrasDAO(req: Request): Promise<any> {
    const upOutras: Outras = req.body;
    const upId = req.params.outraId;
    const connUpdateOutras = await openConnection();
    const updateOutras = await connUpdateOutras.query('UPDATE obras set ? WHERE controlId = ?', [upOutras, upId]);
    return updateOutras;
}
