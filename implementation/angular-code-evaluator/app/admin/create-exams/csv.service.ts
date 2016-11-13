import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import {Utils} from './../../util/util'

@Injectable()
export class CSVService {

    constructor() { }


    getStudentsFromCSV(file: any) {

        var reader:FileReader = new FileReader();
        return Observable.create((observer: any) => {

            reader.readAsText(file);
            reader.onloadend = function (e) {
                var csvData = reader.result;
                var studentsFromCSV = Utils.CSV2JSON(csvData);
                observer.next(studentsFromCSV);
                observer.complete();
            }

            reader.onerror = function(e){
                var studentsFromCSV = new Array<any>();
                observer.next(studentsFromCSV);
                observer.complete();
            }
        });

    }
}