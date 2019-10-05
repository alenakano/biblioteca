import {
    HttpClient,
    HttpHeaders,
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MidiaCadastro } from './midiaCadastro';


@Injectable()
export class MidiaService {

    headers: HttpHeaders;
    url = 'http://localhost:3000/midias';

    constructor(
        private  http: HttpClient
    ) {
        this.headers = new HttpHeaders();
        this.headers.append('Content-Type', 'application/json');
    }

    cadastrar(midia: MidiaCadastro): Observable<any> {
        const body = midia;
        const request = this.url;
        return this.http
            .post(request, body);
    }

    pesquisar(midia: MidiaCadastro): Observable<any> {
        const request = this.url + '/' + midia.doi;
        return this.http
            .get(request);
    }

    atualizar(midia: MidiaCadastro): Observable<any> {
        const body = midia;
        const request = this.url + '/' + midia.doi;
        return this.http.put(request, body);
    }

}
