import { connect } from './database';
import { Pool } from 'mysql2/promise';
import { Request } from 'express';

async function openConnection(): Promise<Pool> {
    return await connect();
}

export async function pesquisaObrasDAO(req: Request): Promise<any> {
    const connGetLivros = await openConnection();
    const obraNome = '%' + req.params.obraNome + '%';
    const obraTipo = req.params.obraTipo;
    const getLivros = await connGetLivros.query(
        'SELECT * FROM obras WHERE author LIKE ? OR title like ? AND category = ?',
        [obraNome, obraNome, obraTipo]
    );
    console.log('PESQUISA OBRAS --->', getLivros[0])
    return getLivros[0];
}

export async function emprestaObrasDAO(req: Request): Promise<any> {
    // const newLivros: Livros = req.body;
    // const connCreateLivros = await openConnection();
    // const createLivros = await connCreateLivros.query('INSERT INTO livros SET ?', [ newLivros ]);
    // return createLivros;
}
