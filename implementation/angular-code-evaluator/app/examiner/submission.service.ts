import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';

import {AuthService} from './../shared/auth.service'
import {AppSettings} from './../shared/app-settings';

import {Submission} from './../model/submission';


@Injectable()
export class SubmissionService {

    private headers:Headers;

    //Get the main URL global variable from the AppSettings class in the shared folder
    private url = AppSettings.API_ENDPOINT;

    constructor(private http:Http, private authService:AuthService) { }
    
    getSubmission(id:number){

        this.headers = new Headers();
        this.headers.append('Authorization', this.authService.credentials);
        
        //make Post request to persist exam, including header
        return this.http
                .get(this.url+`/api/submission/${id}`, {headers : this.headers} )
                .map( (response:Response) => response.json())

        
    }

    getSubmissionsByExercise(exerciseId:number){

        this.headers = new Headers();
        this.headers.append('Authorization', this.authService.credentials);
        
        //make Post request to persist exam, including header
        return this.http
                .get(this.url+`/api/submissions_by_exercise/${exerciseId}`, {headers : this.headers} )
                .map( (response:Response) => response.json())

        
    }

    gradeSubmission(submission:Submission){

        //Get the user credentials from AuthService shared service
        //Important for Basic Authorization header
        this.headers = new Headers();
        this.headers.append('Authorization', this.authService.credentials);

        //make Post request to persist exam, including header
        return this.http
                .put(this.url+`/api/submission/${submission.id}`, submission, {headers : this.headers} )
                .map( (response:Response) => response.json())
    }

    insertComment(id:number, comment:string){

        //Get the user credentials from AuthService shared service
        //Important for Basic Authorization header
        this.headers = new Headers();
        this.headers.append('Authorization', this.authService.credentials);

        //make Post request to persist exam, including header
        return this.http
                .put(this.url+`/api/submission-comment/${id}?comment=${comment}`, {}, {headers : this.headers} )
                .map( (response:Response) => response.json())
    }
}

