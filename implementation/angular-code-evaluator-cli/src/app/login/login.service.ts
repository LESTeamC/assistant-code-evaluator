import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {Subject} from 'rxjs/Subject';
import {Http, Headers, Response} from '@angular/http';

import {AppSettings} from './../shared/app-settings';

import {Credentials} from './../model/credentials';


@Injectable()
/**
 * This service handles API calls for Login Modules (Admin and Examiner)
 */
export class LoginService {

    private headers:Headers;

    //Set URL according to global variable in appsettings
    private url = AppSettings.API_ENDPOINT;

    constructor(private http:Http){}

    /**
     * Login funtion.
     * @param: username
     * @param: password
     * @returns: Observable with user Account
     */
    login(username:string, password:string): Observable<any> {

        this.headers = new Headers();

        //Important to set Authorization Header for Basic Authorization.
        //In this specific Service, AuthService does not provide the header because it was not set yet
        //So we have to make the encryption here
        this.headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
        return this.http
                .get(this.url+`/api/login?username=${username}`, {headers : this.headers} )
                .map( (response:Response) => response.json())
    }

    /**
     * Login Admin funtion.
     * @param: username
     * @param: password
     * @returns: Observable with admin Account
     */
    loginAdmin(username:string, password:string): Observable<any> {

        this.headers = new Headers();
        this.headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
        return this.http
                .get(this.url+`/admin/login?username=${username}`, {headers : this.headers} )
                .map( (response:Response) => response.json())
    }

}