import {
    HttpClient,
    HttpHeaders,
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Situacao } from './situacao';

@Injectable()
export class SituacaoService {

    headers: HttpHeaders;
    url = 'http://localhost:3000/bloqueios';


    constructor(
        private  http: HttpClient
    ) {
        this.headers = new HttpHeaders();
        this.headers.append('Content-Type', 'application/json');
    }

    pesquisar(cpf: string): Observable<any> {
        const request = this.url + '/' + cpf;
        return this.http
            .get(request);
    }

    atualizar(usuario: Situacao): Observable<any> {
        const body = usuario;
        const request = this.url + '/' + usuario.cpf;
        return this.http.put(request, body);
    }

}
