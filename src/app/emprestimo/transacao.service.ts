import {
    HttpClient,
    HttpHeaders,
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { Emprestimo } from './emprestar/emprestimo';


@Injectable({
    providedIn: 'root'
})
export class TransacaoService {

    headers: HttpHeaders;
    url = 'http://localhost:3000/emprestimos';

    constructor(
        private  http: HttpClient
    ) {
        this.headers = new HttpHeaders();
        this.headers.append('Content-Type', 'application/json');
    }

    emprestar(emprestimo: Emprestimo, cpf: string): Observable<any> {
        const request = this.url + '/' + cpf;
        return this.http
            .post(request, emprestimo, { responseType: 'blob' });
    }

    devolver(devolucao: Emprestimo): Observable<any> {
        const body = devolucao;
        const request = this.url;
        return this.http
            .post(request, body);
    }

}
