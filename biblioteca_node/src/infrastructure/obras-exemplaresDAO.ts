import { connect } from './database';
import { Pool } from 'mysql2/promise';
import { Request } from 'express';

import { Obras } from '../interfaces/obras.interface';
import { Exemplar } from '../interfaces/exemplar.interface';

export async function pesquisaObrasDAO(req: Request): Promise<any> {
    const connGetObras = await openConnection();
    const obraNome = '%' + req.params.obraNome + '%';
    const obraTipo = req.params.obraTipo;
    const getObras = await connGetObras.query(
        `SELECT *
            FROM exemplar ex
            INNER JOIN obra ob
                ON ex.idObra = ob.idObra
        WHERE ob.titulo LIKE ?
            OR ob.autor LIKE ?
            AND ob.idTipo = ?`,
        [obraNome, obraNome, obraTipo]
    );
    console.log(getObras[0])
    return getObras[0];
}

async function openConnection(): Promise<Pool> {
    return await connect();
}

export async function getObrasDAO(): Promise<any> {
    const connGetObras = await openConnection();
    const getObras = await connGetObras.query('SELECT * FROM obra');
    return getObras[0];
}

export async function createExemplarDAO(req: Request): Promise<any> {
    const newExemplar: Exemplar = req.body;
    newExemplar.dataCadastro = new Date();
    const connCreateObras = await openConnection();
    const createObras = await connCreateObras.query('INSERT INTO exemplar SET ?', [ newExemplar ]);
    return createObras;
}

export async function getExemplarDAO(id: string): Promise<any> {
    const idObra = id;
    const connGetExemplar = await openConnection();
    const getExemplar = await connGetExemplar.query('SELECT * FROM exemplar WHERE idObra = ?', [ idObra ]);
    return getExemplar[0];
}

export async function createObrasDAO(req: Request): Promise<any> {
    const newObras: Obras = req.body;
    const connCreateObras = await openConnection();
    const createObras = await connCreateObras.query('INSERT INTO obra SET ?', [ newObras ]);
    return createObras;
}

export async function deleteObrasDAO(id: string): Promise<any> {
    const deleteId = id;
    const connDeleteObras = await openConnection();
    const deleteObras = await connDeleteObras.query('DELETE FROM obra WHERE identificador = ?', [ deleteId ]);
    return deleteObras;
}

export async function getLivroDAO(id: string): Promise<any> {
    const getId = id;
    const connGetObras = await openConnection();
    const getObras = await connGetObras.query('SELECT * FROM obra WHERE identificador = ?', [ getId ]);
    return getObras[0];
}

export async function getObraDAO(id: string): Promise<any> {
    const getId = id;
    const connGetObras = await openConnection();
    const getObras = await connGetObras.query('SELECT * FROM obra WHERE identificador = ?', [ getId ]);
    return getObras[0];
}

export async function updateObrasDAO(req: Request): Promise<any> {
    const upObras: Obras = req.body;
    const upId = req.params.obraId;
    const connUpdateObras = await openConnection();
    const updateObras = await connUpdateObras.query('UPDATE obra set ? WHERE identificador = ?', [upObras, upId]);
    return updateObras;
}

export async function updateExemplarDAO(req: Request): Promise<any> {
    const upExemplar: Exemplar = req.body;
    const upId = req.params.idExemplar;
    const connUpdateObras = await openConnection();
    const updateExemplar = await connUpdateObras.query('UPDATE exemplar set ? WHERE idExemplar = ?', [upExemplar, upId]);
    return updateExemplar;
}
