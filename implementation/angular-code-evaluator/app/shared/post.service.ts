import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class PostService {

    private _url = "https://jsonplaceholder.typicode.com/posts";

    constructor(private _http: Http){

    }

}