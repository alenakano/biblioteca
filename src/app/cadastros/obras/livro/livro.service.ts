import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map, take } from 'rxjs/operators';
import { CategoriaLivros } from './CategoriaLivros';
import { Subject } from 'rxjs';
import { SubscriptionHandlerService } from 'src/app/subscriptionsHandler.service';

import * as categorias from './livro.actions';
import * as fromCategoriaLivro from './livro.reducer';
import { Store } from '@ngrx/store';


@Injectable()
export class LivroService {

    catLivros = new Subject<CategoriaLivros[]>();
    private livros: CategoriaLivros[] = [];

    constructor(
        private db: AngularFirestore,
        private subHandlerService: SubscriptionHandlerService,
        private store: Store<fromCategoriaLivro.State>,
    ) { }

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
}
