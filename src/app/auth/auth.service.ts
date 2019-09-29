import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';

import { AuthData } from './auth-data.model';
import { SubscriptionHandlerService } from '../subscriptionsHandler.service';
import { UIService } from '../util/ui.service';
// as salva na variável tudo que é exportável daquele arquivo
import * as fromRoot from '../app.reducer';
import * as UI from '../util/ui.actions';
import * as Auth from './auth.actions';

@Injectable()
export class AuthService {

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private subHandlerService: SubscriptionHandlerService,
        private snackBar: MatSnackBar,
        private uiService: UIService,
        private store: Store<{ui: fromRoot.State}>,
    ) {}

    initAuthentication(): void {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.store.dispatch(new Auth.SetAuthenticated());
                this.router.navigate(['/']);
            } else {
                this.subHandlerService.clearSubscriptions();
                this.store.dispatch(new Auth.SetUnauthenticated());
                this.router.navigate(['/']);
            }
        });
    }

    registerUser(authData: AuthData) {
        // this.uiService.loadingStateChanged.next(true);
        this.store.dispatch(new UI.StartLoading());
        this.afAuth.auth
        .createUserWithEmailAndPassword(
            authData.email,
            authData.password)
        .then(result => {
            this.store.dispatch(new UI.StopLoading());
            // this.uiService.loadingStateChanged.next(false);
        })
        .catch(error => {
            this.store.dispatch(new UI.StopLoading());
            // this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar(error.message, null, { duration: 3000 });
        });
    }

    login(authData: AuthData) {
        this.store.dispatch(new UI.StartLoading());
        // this.uiService.loadingStateChanged.next(true);
        this.afAuth.auth
        .signInWithEmailAndPassword(
            authData.email,
            authData.password)
        .then(result => {
            this.store.dispatch(new UI.StopLoading());
            // this.uiService.loadingStateChanged.next(false);
        })
        .catch(error => {
            this.store.dispatch(new UI.StopLoading());
            // this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar(error.message, null, { duration: 3000 });
        });
    }

    logout() {
        this.afAuth.auth.signOut();
    }

}
