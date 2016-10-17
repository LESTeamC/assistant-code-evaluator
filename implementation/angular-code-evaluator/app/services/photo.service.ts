import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PhotoService {
    private _url = "http://jsonplaceholder.typicode.com/albums";
    
    constructor(private _http: Http){
    }
    
    getAlbums() {
        return this._http.get(this._url)
            .map(res => res.json());
    }
    
    getPhotos(id){
        return this._http.get(this._url + "/" + id + "/photos")
            .map(res => res.json());
    }
}