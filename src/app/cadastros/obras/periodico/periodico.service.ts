import {
    HttpClient,
    HttpHeaders,
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PeriodicoCadastro } from './periodicoCadastro';


@Injectable()
export class PeriodicoService {

    headers: HttpHeaders;
    url = 'http://localhost:3000/periodicos';

    constructor(
        private  http: HttpClient
    ) {
        this.headers = new HttpHeaders();
        this.headers.append('Content-Type', 'application/json');
    }

    cadastrar(periodico: PeriodicoCadastro): Observable<any> {
        const body = periodico;
        const request = this.url;
        return this.http
            .post(request, body);
    }

    pesquisar(periodico: PeriodicoCadastro): Observable<any> {
        const request = this.url + '/' + periodico.issn;
        return this.http
            .get(request);
    }

    atualizar(periodico: PeriodicoCadastro): Observable<any> {
        const body = periodico;
        const request = this.url + '/' + periodico.issn;
        return this.http.put(request, body);
    }

}
