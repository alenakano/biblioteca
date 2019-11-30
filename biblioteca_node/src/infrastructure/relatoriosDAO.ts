import { connect } from './database';
import { Pool } from 'mysql2/promise';
import { Request } from 'express';

async function openConnection(): Promise<Pool> {
    return await connect();
}

export async function pesquisaEmprestimosDAO(): Promise<any> {
    const connGetEmprestimos = await openConnection();
    const getEmprestimos = await connGetEmprestimos.query(
        'SELECT * FROM obras WHERE author LIKE ? OR title like ? AND category = ?'
    );
    console.log('PESQUISA OBRAS --->', getEmprestimos[0])
    return getEmprestimos[0];
}

export async function pesquisaBloqueiosDAO(): Promise<any> {
    const connGetBloqueios = await openConnection();
    const getBloqueios = await connGetBloqueios.query(
        'SELECT * FROM obras WHERE author LIKE ? OR title like ? AND category = ?'
    );
    return getBloqueios[0];
}

export async function pesquisaAtrasosDAO(): Promise<any> {
    const connGetAtrasos = await openConnection();
    const getAtrasos = await connGetAtrasos.query(
        'SELECT * FROM obras WHERE author LIKE ? OR title like ? AND category = ?'
    );
    return getAtrasos[0];
}
