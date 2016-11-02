import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Http, Headers, Response} from '@angular/http';

import {Credentials} from './../model/credentials';


@Injectable()
export class LoginService {

    private headers = new Headers();

    constructor(private http:Http){}

    login(username:string): Observable<any> {

        this.headers.append('Authorization', 'Basic dXNlcjphZG1pbg==');
        return this.http
                .get(`http://localhost:8080/api/login?username=${username}`, {headers : this.headers} )
                .map(response => console.log(JSON.stringify(response.json)));
    }

}