import {
    HttpClient,
    HttpHeaders,
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RelatoriosService {

    headers: HttpHeaders;
    url = 'http://localhost:3000/relatorios';

    constructor(
        private  http: HttpClient
    ) {
        this.headers = new HttpHeaders();
        this.headers.append('Content-Type', 'application/json');
    }

    livrosEmprestados(): Observable<any> {
        const request = this.url + '/livros-emprestados';
        return this.http
            .get(request, { responseType: 'blob' });
    }

    usuariosBloqueados(): Observable<any> {
        const request = this.url + '/usuarios-bloqueados';
        return this.http
            .get(request, { responseType: 'blob' });
    }

    livrosAtrasados(): Observable<any> {
        const request = this.url + '/livros-atrasados';
        return this.http
            .get(request, { responseType: 'blob' });
    }
}
