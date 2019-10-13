import { connect } from './database';
import { Pool } from 'mysql2/promise';
import { Request } from 'express';

import { Midias } from '../interfaces/midias.interface';

async function openConnection(): Promise<Pool> {
    return await connect();
}

export async function getMidiasDAO(): Promise<any> {
    const connGetMidias = await openConnection();
    const getMidias = await connGetMidias.query('SELECT * FROM obras');
    return getMidias[0];
}

export async function createMidiasDAO(req: Request): Promise<any> {
    const newMidias: Midias = req.body;
    const connCreateMidias = await openConnection();
    const createMidias = await connCreateMidias.query('INSERT INTO obras SET ?', [ newMidias ]);
    return createMidias;
}

export async function deleteMidiasDAO(id: string): Promise<any> {
    const deleteId = id;
    const connDeleteMidias = await openConnection();
    const deleteMidias = await connDeleteMidias.query('DELETE FROM obras WHERE doi = ?', [ deleteId ]);
    return deleteMidias;
}

export async function getMidiaDAO(id: string): Promise<any> {
    const getId = id;
    const connGetMidias = await openConnection();
    const getMidias = await connGetMidias.query('SELECT * FROM obras WHERE doi = ?', [ getId ]);
    return getMidias[0];
}

export async function updateMidiasDAO(req: Request): Promise<any> {
    const upMidias: Midias = req.body;
    const upId = req.params.midiaId;
    const connUpdateMidias = await openConnection();
    const updateMidias = await connUpdateMidias.query('UPDATE obras set ? WHERE doi = ?', [upMidias, upId]);
    return updateMidias;
}
