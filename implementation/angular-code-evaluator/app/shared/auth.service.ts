import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {Credentials} from './../model/credentials';


@Injectable()
export class AuthService {

    private loggedIn: boolean = false;
    private loginType: string;
    private _header: string;

    constructor(){}

    get logInType(){
        return this.loginType;
    }

    get isLoggedIn(): boolean {
        return this.loggedIn;
    }

    login(loginType:string){
        this.loggedIn = true;
        this.loginType = loginType;
    }

    logout(){
        this.loggedIn = false;
        this.loginType = undefined;
        this._header = undefined;
    }

    get credentials():string {
        return this._header;
    }

    setCredentials(login:Credentials) {
        this._header = this.makeHeader(login);
    }

    removeCredentials(){
        this._header = undefined;
    }

    private makeHeader(login: Credentials): string{
        return "Basic " + btoa(login.username + ":" + login.password);
    }

}