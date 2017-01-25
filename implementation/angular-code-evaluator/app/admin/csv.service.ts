import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import {Utils} from './../util/util'
import {Grade} from './../model/grade'
import {Exercise} from './../model/exercise'

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

    downloadCSV(grades:Grade[], exercises:Exercise[], exam:string):boolean{

        if (grades === null || exercises === null || grades.length <= 0 || exercises.length <= 0){
            return false;
        }

        var csv:string = this.buildCSV(grades, exercises);
        var csvContent = "data:text/csv;charset=utf-8,";
        csvContent += csv;
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", exam + "_grades.csv");
        document.body.appendChild(link);

        link.click(); 

        return true;


    }


    private buildCSV(grades:Grade[], exercises:Exercise[]):string{

        var result:string = '';
        var exerciseNames = this.getNames(exercises);
        result += ("Student," + exerciseNames.join(",") + ",Grade\n");

        for (let i = 0; i < grades.length; i++){

            var ctr = 0;
            
            result += grades[i]["studentUsername"] + ",";
            for (let j = 0; j < exercises.length; j++){
                if (ctr > 0) result += ",";

                var exerciseGrade = grades[i].gradesByExercise[exerciseNames[j]];

                if (exerciseGrade === -1){
                     result += "*";
                }else if(exerciseGrade === undefined){
                    result += "0";
                }else{
                    result += grades[i].gradesByExercise[exerciseNames[j]];
                }
                ctr++;
            }
            result += "," + grades[i]["finalGrade"];
            result += "\n";
        }

        return result;
    }

    private getNames(exercises:Exercise[]):string[]{
        
        var exerciseNames:string[] = new Array<string>();
        for (let i = 0; i < exercises.length; i++){
            exerciseNames.push(exercises[i].name);
        }
        return exerciseNames;
    }
}