import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';

import { AuthData } from './auth-data.model';
import { SubscriptionHandlerService } from '../subscriptionsHandler.service';
import { UIService } from '../util/ui.service';
// as salva na variável tudo que é exportável daquele arquivo
import * as fromApp from '../app.reducer';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private isAuthenticated: boolean;

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private subHandlerService: SubscriptionHandlerService,
        private snackBar: MatSnackBar,
        private uiService: UIService,
        private store: Store<{ui: fromApp.State}>,
    ) {}

    initAuthentication(): void {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/']);
            } else {
                this.subHandlerService.clearSubscriptions();
                this.authChange.next(false);
                this.router.navigate(['/']);
                this.isAuthenticated = false;
            }
        });
    }

    registerUser(authData: AuthData) {
        // this.uiService.loadingStateChanged.next(true);
        this.store.next({type: 'START_LOADING'});
        this.afAuth.auth
        .createUserWithEmailAndPassword(
            authData.email,
            authData.password)
        .then(result => {
            this.store.next({type: 'STOP_LOADING'});
            // this.uiService.loadingStateChanged.next(false);
        })
        .catch(error => {
            this.store.next({type: 'STOP_LOADING'});
            // this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar(error.message, null, { duration: 3000 });
        });
    }

    login(authData: AuthData) {
        this.store.next({type: 'START_LOADING'});
        // this.uiService.loadingStateChanged.next(true);
        this.afAuth.auth
        .signInWithEmailAndPassword(
            authData.email,
            authData.password)
        .then(result => {
            this.store.next({type: 'STOP_LOADING'});
            // this.uiService.loadingStateChanged.next(false);
        })
        .catch(error => {
            this.store.next({type: 'STOP_LOADING'});
            // this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar(error.message, null, { duration: 3000 });
        });
    }

    logout() {
        this.afAuth.auth.signOut();
    }

    isAuth() {
        return this.isAuthenticated === true;
    }
}
