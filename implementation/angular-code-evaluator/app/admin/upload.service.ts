import { Injectable } from '@angular/core';

import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';

import {AuthService} from './../shared/auth.service'
import {AppSettings} from './../shared/app-settings';

@Injectable()
export class UploadService {
    private headers:Headers;

    //Get the main URL global variable from the AppSettings class in the shared folder
    private url = AppSettings.API_ENDPOINT;

    constructor(private http:Http, private authService:AuthService) { }

    uploadLibraries(files:Array<File>, exercisesToken:string){

        var formData = new FormData();

        //Get the user credentials from AuthService shared service
        //Important for Basic Authorization header
        this.headers = new Headers();
        this.headers.append('Authorization', this.authService.credentials);
        
        //make Post request to persist exam, including header
        //formData.append("uploadfile", files[0]);

        if(files.length > 0){

            for(var i = 0; i < files.length; i++){
                formData.append("uploadfile", files[i]);
            }
            return this.http
                .post(this.url + `/api/uptest?token=${exercisesToken}`, formData, {headers : this.headers} )
        }

    }

    uploadSubmissions(files:FileList, id:number){

        var formData = new FormData();

        //Get the user credentials from AuthService shared service
        //Important for Basic Authorization header
        this.headers = new Headers();
        this.headers.append('Authorization', this.authService.credentials);
        
        //make Post request to persist exam, including header
        //formData.append("uploadfile", files[0]);

        console.log(files);
        if(files.length > 0){

            formData.append("uploadfile", files[0]);
            
            return this.http
                .post(this.url + `/api/students_submissions/${id}`, formData, {headers : this.headers} )
        }

    }
}