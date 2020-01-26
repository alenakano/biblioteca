import {
    HttpClient,
    HttpHeaders,
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { UsuariosCadastro } from './usuariosCadastro';


@Injectable()
export class UsuariosService {

    headers: HttpHeaders;
    url = 'http://localhost:3000/usuarios';

    catUsuarios = new Subject<UsuariosCadastro[]>();

    constructor(
        private  http: HttpClient
    ) {
        this.headers = new HttpHeaders();
        this.headers.append('Content-Type', 'application/json');
    }

    cadastrar(usuario: UsuariosCadastro): Observable<any> {
        const body = usuario;
        const request = this.url;
        return this.http
            .post(request, body);
    }

    pesquisar(usuario: UsuariosCadastro): Observable<any> {
        const request = this.url + '/' + usuario.CPF;
        return this.http
            .get(request);
    }

    atualizar(usuario: UsuariosCadastro): Observable<any> {
        const body = usuario;
        const request = this.url + '/' + usuario.CPF;
        return this.http.put(request, body);
    }

}
