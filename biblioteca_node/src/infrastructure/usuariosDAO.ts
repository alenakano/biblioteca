import { connect } from './database';
import { Pool } from 'mysql2/promise';
import { Request } from 'express';

import { Usuarios } from '../interfaces/usuarios.interface';
import { Bloqueio } from '../interfaces/bloqueio.interface';

async function openConnection(): Promise<Pool> {
    return await connect();
}

export async function getUsuariosDAO(): Promise<any> {
    const connGetUsuarios = await openConnection();
    const getUsuarios = await connGetUsuarios.query('SELECT * FROM usuarios');
    return getUsuarios[0];
}

export async function createUsuariosDAO(req: Request): Promise<any> {
    const newUsuarios: Usuarios = req.body;
    const connCreateUsuarios = await openConnection();
    const createUsuarios = await connCreateUsuarios.query('INSERT INTO usuario SET ?', [ newUsuarios ]);
    return createUsuarios;
}

export async function deleteUsuariosDAO(id: string): Promise<any> {
    const deleteId = id;
    const connDeleteUsuarios = await openConnection();
    const deleteUsuarios = await connDeleteUsuarios.query('DELETE FROM usuario WHERE CPF = ?', [ deleteId ]);
    return deleteUsuarios;
}

export async function getUsuarioDAO(id: string): Promise<any> {
    const getId = id;
    const connGetUsuarios = await openConnection();
    const getUsuarios = await connGetUsuarios.query('SELECT * FROM usuario WHERE CPF = ?', [ getId ]);
    return getUsuarios[0];
}

export async function updateUsuariosDAO(req: Request): Promise<any> {
    const upUsuarios: Usuarios = req.body;
    const upId = req.params.cpf;
    const connUpdateUsuarios = await openConnection();
    const updateUsuarios = await connUpdateUsuarios.query('UPDATE usuario set ? WHERE CPF = ?', [upUsuarios, upId]);
    return updateUsuarios;
}

export async function getUsuarioBloqueioDAO(id: string): Promise<any> {
    const getId = id;
    const connGetUsuarios = await openConnection();
    const getUsuarios = await connGetUsuarios.query('SELECT * FROM usuario WHERE CPF = ?', [ getId ]);
    const parsed: Bloqueio = await parseResponse(getUsuarios);
    return parsed;
}

export async function updateUsuarioBloqueioDAO(req: Request): Promise<any> {
    const upId = req.params.cpf;
    const status = req.body.status;
    const dataBloqueio = req.body.dataBloqueio;
    const dataDesbloqueio = req.body.dataDesbloqueio;

    const connUpdateUsuarios = await openConnection();
    const updateUsuarios = await connUpdateUsuarios
        .query('UPDATE usuario SET status = ?, dataBloqueio = ?, dataDesbloqueio = ? WHERE CPF = ?', 
        [status, dataBloqueio, dataDesbloqueio, upId]);
    console.log(updateUsuarios);
    return updateUsuarios;
}

async function parseResponse(userData: any) {
    const parsedResp: Bloqueio = new Bloqueio();
    userData = userData[0] as Usuarios;
    parsedResp.cpf = userData[0].cpf;
    const date = new Date();
    if (userData[0].dataDesbloqueio == 'Invalid Date'
        || userData[0].dataDesbloqueio == 'NaN'
        || (Date.parse(userData[0].dataDesbloqueio.getTime()) <= date.getTime())) {
        parsedResp.status = 0;
        parsedResp.dataBloqueio = undefined;
        parsedResp.dataDesbloqueio = undefined;
        return parsedResp;
    } else {
        parsedResp.status = 1;
        parsedResp.dataBloqueio = userData[0].dataBloqueio;
        parsedResp.dataDesbloqueio = userData[0].dataDesbloqueio;
        return parsedResp;
    }
}
