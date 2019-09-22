import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { CategoriaLivros } from './CategoriaLivros';
import { Subject } from 'rxjs';
import { SubscriptionHandlerService } from 'src/app/subscriptionsHandler.service';

@Injectable()
export class LivroService {

    catLivros = new Subject<CategoriaLivros[]>();
    private livros: CategoriaLivros[] = [];

    constructor(
        private db: AngularFirestore,
        private subHandlerService: SubscriptionHandlerService
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
            .subscribe((livros: CategoriaLivros[]) => {
                this.livros = livros;
                this.catLivros.next([...this.livros]);
            })
        );

    }

}