import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {Credentials} from './../model/credentials';


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
        console.log(this._header)
    }

    removeCredentials(){
        this._header = undefined;
    }

    /**
     * Creates the Authorization header with 64bit encryption
     */
    private makeHeader(login: Credentials): string{
        return "Basic " + btoa(login.username + ":" + login.password);
    }

}