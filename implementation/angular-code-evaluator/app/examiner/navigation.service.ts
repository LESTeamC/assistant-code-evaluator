import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class NavigationService {

    private _currentId:number;
    private _currentIndex:number;

    private submissionList:number[];

    constructor(private route:Router) { }

    get currentId(){
        return this._currentId;
    }

    existsNext():boolean{
        return (this._currentIndex < this.submissionList.length-1);
    }

    existsPrevious():boolean{
        return (this._currentIndex > 0);
    }

    navigateNext():void{

       var nextId = this.submissionList[this._currentIndex + 1];

       this._currentId = nextId;
       this._currentIndex += 1;
       this.route.navigate(['/examiner/workstation/', nextId])
    }

    navigatePrevious():void{

       var previousId = this.submissionList[this._currentIndex - 1];

       this._currentId = previousId;
       this._currentIndex -= 1;
       this.route.navigate(['/examiner/workstation/', previousId])
    }

    buildService(idList:number[], currentSubmission:number){
        this._currentId = currentSubmission;
        this.submissionList = idList;
        
        this._currentIndex = idList.findIndex(elem => elem == currentSubmission);

        console.log(this._currentId);
        console.log(this.submissionList);
        console.log(this._currentIndex);

        console.log(this.submissionList.length);

        console.log(this.existsNext());
        console.log(this.existsPrevious());
    }
}