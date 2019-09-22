import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';

import { AuthData } from './auth-data.model';
import { SubscriptionHandlerService } from '../subscriptionsHandler.service';


@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private isAuthenticated: boolean;

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private subHandlerService: SubscriptionHandlerService,
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
        this.afAuth.auth
        .createUserWithEmailAndPassword(
            authData.email,
            authData.password)
        .then(result => {
        })
        .catch(error => {
            console.log(error);
        });
    }

    login(authData: AuthData) {
        this.afAuth.auth
        .signInWithEmailAndPassword(
            authData.email,
            authData.password)
        .then(result => {
        })
        .catch(error => {
            console.log(error);
        });
    }

    logout() {
        this.afAuth.auth.signOut();
    }

    isAuth() {
        return this.isAuthenticated === true;
    }
}
