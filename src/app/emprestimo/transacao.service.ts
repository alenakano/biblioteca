import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transacoes } from './transacoes';

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {

  headers: HttpHeaders;
    url = 'http://localhost:3000/obras';

    constructor(
        private  http: HttpClient
    ) {
        this.headers = new HttpHeaders();
        this.headers.append('Content-Type', 'application/json');
    }

    emprestar(emprestimo: Transacoes): Observable<any> {
      const body = emprestimo;
      const request = this.url + '/emprestimos' +
        emprestimo.cpf + '/' +
        emprestimo.idObra;
      return this.http.post(request, body);
    }

    devolver(emprestimo: Transacoes): Observable<any> {
        const body = emprestimo;
        const request = this.url + '/emprestimos';
        return this.http.put(request, body);
    }
}
