import { connect } from './database';
import { Pool } from 'mysql2/promise';
import { Request } from 'express';
var moment = require('moment');

async function openConnection(): Promise<Pool> {
    return await connect();
}

export async function pesquisaEmprestimosDAO(): Promise<any> {
    const connGetEmprestimos = await openConnection();
    const getEmprestimos = await connGetEmprestimos.query(
        `SELECT
            ex.idExemplar
		    , ex.idObra
		    , ex.numExemplar
		    , ex.tomo
		    , ob.titulo
		    , ob.autor
	        FROM exemplar ex
	        INNER JOIN obra ob
		        ON ex.idObra = ob.idObra
        WHERE ex.status = 1`
    );
    return getEmprestimos[0];
}

export async function pesquisaBloqueiosDAO(): Promise<any> {
    const connGetBloqueios = await openConnection();
    const getBloqueios = await connGetBloqueios.query(
        'SELECT * FROM usuario WHERE status = 1'
    );
    return getBloqueios[0];
}

export async function pesquisaAtrasosDAO(): Promise<any> {
    const connGetAtrasos = await openConnection();
    const data = new Date();
    const getAtrasos = await connGetAtrasos.query(
        `SELECT
                ex.idExemplar
                , ex.idObra
                , ex.numExemplar
                , ex.tomo
                , ob.titulo
                , ob.autor
            FROM exemplar ex
            INNER JOIN obra ob
                ON ex.idObra = ob.idObra
            INNER JOIN emprestimo em
                ON ex.idExemplar = em.idExemplar
        WHERE ex.status = 1
            AND em.dataPrevisao < (SELECT NOW())`
    );
    return getAtrasos[0];
}
