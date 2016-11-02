import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {Subject} from 'rxjs/Subject';
import {Http, Headers, Response} from '@angular/http';

import {AuthService} from './../shared/auth.service'
import {Credentials} from './../model/credentials';


@Injectable()
export class LoginService {

    private headers = new Headers();

    constructor(private http:Http, private authService:AuthService){}

    login(username:string, password:string): Observable<any> {

        this.headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
        return this.http
                .get(`http://localhost:8080/api/login?username=${username}`, {headers : this.headers} )
                .map( (response:Response) => response.json())
    }

    loginAdmin(username:string, password:string): Observable<any> {

        this.headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
        return this.http
                .get(`http://localhost:8080/admin/login?username=${username}`, {headers : this.headers} )
                .map( (response:Response) => response.json())
    }

}