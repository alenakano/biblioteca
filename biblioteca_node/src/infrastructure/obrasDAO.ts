import { connect } from './database';
import { Pool } from 'mysql2/promise';
import { Request } from 'express';

async function openConnection(): Promise<Pool> {
    return await connect();
}

export async function pesquisaObrasDAO(req: Request): Promise<any> {
    const connGetLivros = await openConnection();
    let obraNome = req.params.obraNome;
    let obraTipo = req.params.obraTipo;
    const getLivros = await connGetLivros.query(
        'SELECT * FROM obras WHERE author = ? OR title = ? AND category = ?',
        [obraNome, obraNome, obraTipo]
    );
    return getLivros[0];
}

export async function emprestaObrasDAO(req: Request): Promise<any> {
    // const newLivros: Livros = req.body;
    // const connCreateLivros = await openConnection();
    // const createLivros = await connCreateLivros.query('INSERT INTO livros SET ?', [ newLivros ]);
    // return createLivros;
}
