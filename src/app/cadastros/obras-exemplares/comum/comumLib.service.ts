import {
    HttpClient,
    HttpHeaders,
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map, take } from 'rxjs/operators';
import { CategoriaComum } from './categoriaComum';
import { Subject, Observable } from 'rxjs';
import { SubscriptionHandlerService } from 'src/app/subscriptionsHandler.service';

import * as categorias from './comumLib.actions';
import * as fromCategoriaLivro from './comumLib.reducer';
import { Store } from '@ngrx/store';
import { ObraCadastro } from './obraCadastro';
import { IdentificadorObra } from './identificador-obra';
import { ExemplarCadastro } from './exemplarCadastro';


@Injectable()
export class ComumLibService {

    headers: HttpHeaders;
    url = 'http://localhost:3000/obras';

    catLivros = new Subject<CategoriaComum[]>();
    private livros: CategoriaComum[] = [];

    constructor(
        private db: AngularFirestore,
        private subHandlerService: SubscriptionHandlerService,
        private store: Store<fromCategoriaLivro.State>,
        private  http: HttpClient
    ) {
        this.headers = new HttpHeaders();
        this.headers.append('Content-Type', 'application/json');
    }

    consultaObra(identificador: IdentificadorObra): Observable<any> {
        const request = this.url + '/' + identificador.identificador;
        return this.http.get(request);
    }

    cadastrarObra(obra: ObraCadastro): Observable<any> {
        const body = obra;
        const request = this.url;
        return this.http
            .post(request, body);
    }

    fetchExemplar(idObra: number): Observable<any> {
        const request = this.url + '/exemplares/' + idObra;
        return this.http
            .get(request);
    }

    cadastrarExemplar(exemplar: ExemplarCadastro): Observable<any> {
        const body = exemplar;
        const request = this.url + '/cadastrarExemplar/';
        return this.http
            .post(request, body);
    }

    atualizarObra(obra: ObraCadastro): Observable<any> {
        const body = obra;
        const request = this.url + '/' + obra.identificador;
        return this.http.put(request, body);
    }

}
