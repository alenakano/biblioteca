import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Pesquisa } from './pesquisa';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NovaService {

  headers: HttpHeaders;
    url = 'http://localhost:3000/obras';

    constructor(
        private  http: HttpClient
    ) {
        this.headers = new HttpHeaders();
        this.headers.append('Content-Type', 'application/json');
    }

    pesquisar(pesquisa: Pesquisa): Observable<any> {
        const request = this.url + '/pesquisas/' +
          pesquisa.nomeObra + '/' +
          pesquisa.tipoObra;
        return this.http
            .get(request);
    }
}
