import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';

import { AuthData } from './auth-data.model';


@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private isAuthenticated: boolean;

    constructor(private router: Router, private afAuth: AngularFireAuth) {}

    registerUser(authData: AuthData) {
        this.afAuth.auth
        .createUserWithEmailAndPassword(
            authData.email,
            authData.password)
        .then(result => {
            console.log(result);
            this.isAuthenticated = true;
            this.authChange.next(true);
            this.router.navigate(['/cadastro']);
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
            console.log(result);
            this.isAuthenticated = true;
            this.authChange.next(true);
            this.router.navigate(['/']);
        })
        .catch(error => {
            console.log(error);
        });
    }

    logout() {
        this.afAuth.auth.signOut();
        this.authChange.next(false);
        this.router.navigate(['/']);
        this.isAuthenticated = false;
    }

    isAuth() {
        return this.isAuthenticated === true;
    }
}
