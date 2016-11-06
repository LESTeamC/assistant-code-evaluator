import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {Subject} from 'rxjs/Subject';
import {Http, Headers, Response} from '@angular/http';

import {AppSettings} from './../shared/app-settings';

import {AuthService} from './../shared/auth.service'
import {Credentials} from './../model/credentials';


@Injectable()
export class LoginService {

    private headers:Headers;
    private url = AppSettings.API_ENDPOINT;

    constructor(private http:Http, private authService:AuthService){}

    login(username:string, password:string): Observable<any> {

        this.headers = new Headers();
        this.headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
        return this.http
                .get(this.url+`/api/login?username=${username}`, {headers : this.headers} )
                .map( (response:Response) => response.json())
    }

    loginAdmin(username:string, password:string): Observable<any> {

        this.headers = new Headers();
        this.headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
        return this.http
                .get(this.url+`/admin/login?username=${username}`, {headers : this.headers} )
                .map( (response:Response) => response.json())
    }

}