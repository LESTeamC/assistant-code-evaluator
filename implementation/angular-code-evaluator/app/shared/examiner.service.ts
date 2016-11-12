import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';

import {AuthService} from './../shared/auth.service'
import {AppSettings} from './../shared/app-settings';

import {Examiner} from './../model/examiner';

@Injectable()
/**
* Contains functions that get, post and update Examiners onto the API and DB
*/
export class ExaminerService {

    private headers:Headers;

    //Get the main URL global variable from the AppSettings class in the shared folder
    private url = AppSettings.API_ENDPOINT;

    constructor(private http:Http, private authService:AuthService) { }

    /**
    * Gets Examiner from DB
    * @param: username String
    * @return: Examiner with the given username
    */
    getExaminer(username: string){

        //Get the user credentials from AuthService shared service
        //Important for Basic Authorization header
        this.headers = new Headers();
        this.headers.append('Authorization', this.authService.credentials);
        
        //make Post request to persist exam, including header
        return this.http
                .get(this.url+`/api/examiner?username=${username}`, {headers : this.headers} )
                .map( (response:Response) => response.json())
            
    }

    /**
    * Gets Examiner from DB
    * @param: username String
    * @return: Examiner with the given username
    */
    getExaminers(){

        //Get the user credentials from AuthService shared service
        //Important for Basic Authorization header
        this.headers = new Headers();
        this.headers.append('Authorization', this.authService.credentials);
        
        //make Post request to persist exam, including header
        return this.http
                .get(this.url+`/admin/examiners`, {headers : this.headers} )
                .map( (response:Response) => response.json())
            
    }
}