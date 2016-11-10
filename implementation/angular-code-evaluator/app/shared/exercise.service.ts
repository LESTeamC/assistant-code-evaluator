import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';

import {AuthService} from './../shared/auth.service'
import {AppSettings} from './../shared/app-settings';

import {Exercise} from './../model/exercise';

@Injectable()
export class ExerciseService {

    private headers:Headers;

    //Get the main URL global variable from the AppSettings class in the shared folder
    private url = AppSettings.API_ENDPOINT;

    constructor(private http:Http, private authService:AuthService) { }

    getExercises(){

        //Get the user credentials from AuthService shared service
        //Important for Basic Authorization header
        this.headers = new Headers();
        this.headers.append('Authorization', this.authService.credentials);
        
        //make Post request to persist exam, including header
        return this.http
                .get(this.url+`/admin/exercises`, {headers : this.headers} )
                .map( (response:Response) => response.json())
    }

    delegateExercise(exerciseId:number, examinerId:any){

        //Get the user credentials from AuthService shared service
        //Important for Basic Authorization header
        this.headers = new Headers();
        this.headers.append('Authorization', this.authService.credentials);
        
        examinerId = (examinerId === undefined) ? "" : examinerId;

        //make Post request to persist exam, including header
        return this.http
                .put(this.url+`/admin/exercise/${exerciseId}?examinerId=${examinerId}`, {}, {headers : this.headers} )
                .map( (response:Response) => response.json())
    }
}