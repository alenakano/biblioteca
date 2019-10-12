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
    const createUsuarios = await connCreateUsuarios.query('INSERT INTO usuarios SET ?', [ newUsuarios ]);
    return createUsuarios;
}

export async function deleteUsuariosDAO(id: string): Promise<any> {
    const deleteId = id;
    const connDeleteUsuarios = await openConnection();
    const deleteUsuarios = await connDeleteUsuarios.query('DELETE FROM usuarios WHERE cpf = ?', [ deleteId ]);
    return deleteUsuarios;
}

export async function getUsuarioDAO(id: string): Promise<any> {
    const getId = id;
    const connGetUsuarios = await openConnection();
    const getUsuarios = await connGetUsuarios.query('SELECT * FROM usuarios WHERE cpf = ?', [ getId ]);
    return getUsuarios[0];
}

export async function updateUsuariosDAO(req: Request): Promise<any> {
    const upUsuarios: Usuarios = req.body;
    const upId = req.params.cpf;
    const connUpdateUsuarios = await openConnection();
    const updateUsuarios = await connUpdateUsuarios.query('UPDATE usuarios set ? WHERE cpf = ?', [upUsuarios, upId]);
    return updateUsuarios;
}

export async function getUsuarioBloqueioDAO(id: string): Promise<any> {
    const getId = id;
    const connGetUsuarios = await openConnection();
    const getUsuarios = await connGetUsuarios.query('SELECT * FROM usuarios WHERE cpf = ?', [ getId ]);
    const parsed: Bloqueio = await parseResponse(getUsuarios);
    return parsed;
}

export async function updateUsuarioBloqueioDAO(req: Request): Promise<any> {
    const upUsuarios: Usuarios = req.body;
    const upId = req.params.cpf;
    const connUpdateUsuarios = await openConnection();
    const updateUsuarios = await connUpdateUsuarios.query('UPDATE usuarios set ? WHERE cpf = ?', [upUsuarios, upId]);
    return updateUsuarios;
}

async function parseResponse(userData: any) {
    const parsedResp: Bloqueio = new Bloqueio();
    userData = userData[0] as Usuarios;
    parsedResp.cpf = userData[0].cpf;
    let date = new Date();
    if (Date.parse(userData[0].date_unblock) < date.getTime()) {
        parsedResp.blocked = false;
        parsedResp.date_block = undefined;
        parsedResp.date_unblock = undefined;
        return parsedResp;
    } else {
        parsedResp.blocked = userData[0].blocked;
        parsedResp.date_block = userData[0].date_block;
        parsedResp.date_unblock = userData[0].date_unblock;
        return parsedResp;
    }
}
