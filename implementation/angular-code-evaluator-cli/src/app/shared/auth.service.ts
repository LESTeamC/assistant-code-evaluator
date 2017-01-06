import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


import {
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from '@angular/router';

import { Credentials } from './../model/credentials';


@Injectable()
/**
 * Shared Service that handles the Basic Authorizations header to use by ALL SERVICES
 */
export class AuthService {

    //Tells if user is logged in or not
    private loggedIn: boolean = false;

    //Tells if user is logged in as admin or user
    private loginType: string;

    //Variable that hold the Basic Authorization header!
    private _header: string;

    //Variable that holds the username;
    private _username: string;


    constructor(private router: Router) {
        this.loggedIn = !!localStorage.getItem('auth-token');

        if (this.loggedIn) {
            this.loginType = localStorage.getItem('login');
            this._header = this.makeHeaderWithToken(localStorage.getItem('auth-token'));
            this._username = localStorage.getItem('username');
        }
    }

    get logInType() {
        return this.loginType;
    }

    get isLoggedIn(): boolean {
        return this.loggedIn;
    }

    get username(): string {
        return this._username;
    }

    login(login: Credentials, loginType: string) {
        this.loggedIn = true;
        this.loginType = loginType;
        localStorage.setItem('login', loginType);

        this.setCredentials(login);

    }

    logout() {
        this.loggedIn = false;
        this._header = undefined;

        localStorage.clear();

        this.redirectUser();
    }

    get credentials(): string {
        return this._header;
    }

    setCredentials(login: Credentials) {
        this._header = this.makeHeader(login);
        this._username = login.username;

        localStorage.setItem('username', login.username);
        localStorage.setItem('auth-token', this.makeToken(login));
    }

    removeCredentials() {
        this._header = undefined;
    }

    /**
     * Creates the Authorization header with 64bit encryption
     */
    private makeHeader(login: Credentials): string {
        return "Basic " + btoa(login.username + ":" + login.password);
    }

    private makeHeaderWithToken(token: string): string {
        return "Basic " + token;
    }

    private makeToken(credentials: Credentials): string {
        return btoa(credentials.username + ":" + credentials.password);
    }


    redirectUser() {
        if (this.loginType === "admin") {
            this.router.navigate(['/loginadmin']);
        } else {
            this.router.navigate(['/login']);
        }

        this.loginType = undefined;

    }

}