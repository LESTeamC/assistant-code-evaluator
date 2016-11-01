import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {Credentials} from './../model/credentials';


@Injectable()
export class AuthService {

    private _header: string;

    constructor(){}

    get credentials():string {
        return this._header;
    }

    setCredentials(login:Credentials) {
        this._header = this.makeHeader(login);
    }

    remove(){
        this._header = "";
    }

    private makeHeader(login: Credentials): string{
        return "Basic " + btoa(login.username + ":" + login.password);
    }

}