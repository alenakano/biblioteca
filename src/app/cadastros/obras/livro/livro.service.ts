import {
    HttpClient,
    HttpHeaders,
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map, take } from 'rxjs/operators';
import { CategoriaLivros } from './CategoriaLivros';
import { Subject, Observable } from 'rxjs';
import { SubscriptionHandlerService } from 'src/app/subscriptionsHandler.service';

import * as categorias from './livro.actions';
import * as fromCategoriaLivro from './livro.reducer';
import { Store } from '@ngrx/store';
import { LivroCadastro } from './livroCadastro';


@Injectable()
export class LivroService {

    headers: HttpHeaders;
    url = 'http://localhost:3000/livros';

    catLivros = new Subject<CategoriaLivros[]>();
    private livros: CategoriaLivros[] = [];

    constructor(
        private db: AngularFirestore,
        private subHandlerService: SubscriptionHandlerService,
        private store: Store<fromCategoriaLivro.State>,
        private  http: HttpClient
    ) {
        this.headers = new HttpHeaders();
        this.headers.append('Content-Type', 'application/json');
    }

    fetchLivros() {
        this.subHandlerService.pushSubscription(
            this.db
            .collection('catLivros')
            .snapshotChanges()
            .pipe(
            map(docArray => {
                return docArray.map(doc => {
                    return {
                        ...doc.payload.doc.data()
                    };
                });
            }))
            .pipe(take(1)).subscribe((livros: CategoriaLivros[]) => {
                this.livros = livros;
                this.store.dispatch(new categorias.SetCategoriasLivro(livros));
            })
        );
    }

    cadastrar(livro: LivroCadastro): Observable<any> {
        const body = livro;
        console.log(livro);
        const request = this.url;
        return this.http
            .post(request, body);
    }

    pesquisar(livro: LivroCadastro): Observable<any> {
        const request = this.url + '/' + livro.isbn;
        return this.http
            .get(request);
    }

    atualizar(livro: LivroCadastro): Observable<any> {
        const body = livro;
        const request = this.url + '/' + livro.isbn;
        return this.http.put(request, body);
    }

}
