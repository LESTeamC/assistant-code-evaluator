import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';

import {AuthService} from './../shared/auth.service'
import {AppSettings} from './../shared/app-settings';


@Injectable()
export class ExamService {

    private headers:Headers;
    private url = AppSettings.API_ENDPOINT;

    constructor(private http:Http, private authService:AuthService) { }

    createExam(exam: any){
        this.headers = new Headers();
        this.headers.append('Authorization', this.authService.credentials);
        
        return this.http
                .post(this.url+`/admin/exam`, exam, {headers : this.headers} )
                .map( (response:Response) => response.json())
            
    }
}