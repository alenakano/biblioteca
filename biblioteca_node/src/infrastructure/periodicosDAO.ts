import { connect } from './database';
import { Pool } from 'mysql2/promise';
import { Request } from 'express';

import { Periodicos } from '../interfaces/periodicos.interface';

async function openConnection(): Promise<Pool> {
    return await connect();
}

export async function getPeriodicosDAO(): Promise<any> {
    const connGetPeriodicos = await openConnection();
    const getPeriodicos = await connGetPeriodicos.query('SELECT * FROM obras');
    return getPeriodicos[0];
}

export async function createPeriodicosDAO(req: Request): Promise<any> {
    const newPeriodicos: Periodicos = req.body;
    const connCreatePeriodicos = await openConnection();
    const createPeriodicos = await connCreatePeriodicos.query('INSERT INTO obras SET ?', [ newPeriodicos ]);
    return createPeriodicos;
}

export async function deletePeriodicosDAO(id: string): Promise<any> {
    const deleteId = id;
    const connDeletePeriodicos = await openConnection();
    const deletePeriodicos = await connDeletePeriodicos.query('DELETE FROM obras WHERE issn = ?', [ deleteId ]);
    return deletePeriodicos;
}

export async function getPeriodicoDAO(id: string): Promise<any> {
    const getId = id;
    const connGetPeriodicos = await openConnection();
    const getPeriodicos = await connGetPeriodicos.query('SELECT * FROM obras WHERE issn = ?', [ getId ]);
    return getPeriodicos[0];
}

export async function updatePeriodicosDAO(req: Request): Promise<any> {
    const upPeriodicos: Periodicos = req.body;
    const upId = req.params.periodicoId;
    const connUpdatePeriodicos = await openConnection();
    const updatePeriodicos = await connUpdatePeriodicos.query('UPDATE obras set ? WHERE issn = ?', [upPeriodicos, upId]);
    return updatePeriodicos;
}