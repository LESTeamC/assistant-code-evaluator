import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';

import {AuthService} from './../shared/auth.service'
import {AppSettings} from './../shared/app-settings';

import {Exam} from './../model/exam';


@Injectable()
/**
* Contains functions that get, post and update exams onto the API and DB
*/
export class ExamService {

    private headers:Headers;

    //Get the main URL global variable from the AppSettings class in the shared folder
    private url = AppSettings.API_ENDPOINT;

    constructor(private http:Http, private authService:AuthService) { }

    /**
    * Persists Exam in DB
    * @param: Exam to persist
    */
    createExam(exam: Exam){

        //Get the user credentials from AuthService shared service
        //Important for Basic Authorization header
        this.headers = new Headers();
        this.headers.append('Authorization', this.authService.credentials);
        
        //make Post request to persist exam, including header
        return this.http
                .post(this.url+`/admin/exam`, exam, {headers : this.headers} )
                .map( (response:Response) => response.json())
            
    }

    getExamBySubmission(submissionId:number){

        //Get the user credentials from AuthService shared service
        //Important for Basic Authorization header
        this.headers = new Headers();
        this.headers.append('Authorization', this.authService.credentials);
        
        //make Post request to persist exam, including header
        return this.http
                .get(this.url+`/api/exam-by-submission/${submissionId}`, {headers : this.headers} )
                .map( (response:Response) => response.json())
    }

    getExam(id:number){

        //Get the user credentials from AuthService shared service
        //Important for Basic Authorization header
        this.headers = new Headers();
        this.headers.append('Authorization', this.authService.credentials);
        
        //make Post request to persist exam, including header
        return this.http
                .get(this.url+`/admin/exam/${id}`, {headers : this.headers} )
                .map( (response:Response) => response.json())        
    }


    getExams(){

        //Get the user credentials from AuthService shared service
        //Important for Basic Authorization header
        this.headers = new Headers();
        this.headers.append('Authorization', this.authService.credentials);
        
        //make Post request to persist exam, including header
        return this.http
                .get(this.url+`/admin/exams`, {headers : this.headers} )
                .map( (response:Response) => response.json())        
    }

    deleteExam(id:number){

        //Get the user credentials from AuthService shared service
        //Important for Basic Authorization header
        this.headers = new Headers();
        this.headers.append('Authorization', this.authService.credentials);
        
        //make Post request to persist exam, including header
        return this.http
                .delete(this.url+`/admin/exam/${id}`, {headers : this.headers} )
    }

    getGrades(id:number){

         //Get the user credentials from AuthService shared service
        //Important for Basic Authorization header
        this.headers = new Headers();
        this.headers.append('Authorization', this.authService.credentials);
        
        //make Post request to persist exam, including header
        return this.http
                .get(this.url+`/admin/grades/${id}`, {headers : this.headers} )
                .map( (response:Response) => response.json())        
    }
}