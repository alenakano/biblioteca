import { connect } from './database';
import { Pool } from 'mysql2/promise';
import { Request } from 'express';

import { Usuarios } from '../interfaces/usuarios.interface';

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
