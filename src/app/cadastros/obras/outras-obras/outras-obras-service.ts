import {
    HttpClient,
    HttpHeaders,
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { OutrasObrasCadastro } from './outras-obrasCadastro';


@Injectable()
export class OutrasObrasService {

    headers: HttpHeaders;
    url = 'http://localhost:3000/outras';

    constructor(
        private  http: HttpClient
    ) {
        this.headers = new HttpHeaders();
        this.headers.append('Content-Type', 'application/json');
    }

    cadastrar(outras: OutrasObrasCadastro): Observable<any> {
        const body = outras;
        const request = this.url;
        return this.http
            .post(request, body);
    }

    pesquisar(outras: OutrasObrasCadastro): Observable<any> {
        const request = this.url + '/' + outras.controlId;
        return this.http
            .get(request);
    }

    atualizar(outras: OutrasObrasCadastro): Observable<any> {
        const body = outras;
        const request = this.url + '/' + outras.controlId;
        return this.http.put(request, body);
    }

}
