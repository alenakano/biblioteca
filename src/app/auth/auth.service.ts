import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';


export class AuthService {
    authChange = new Subject<boolean>();
    private user: User;

    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        // O subject "emite o evento" que pode ser capturado, no caso informando ser logado
        this.authChange.next(true);
    }

    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
    }

    logout() {
        this.user = null;
    }

    getUser() {
        return { ...this.user };
    }

    isAuth() {
        return this.user !== null;
    }
}
