import {Component, OnInit, ViewChild}	from '@angular/core';
import {Router} from '@angular/router';
import { Examiner } from './../../model/examiner'
import { ExaminerService } from './../../shared/examiner.service'
import { Account } from './../../model/account';
import { Observable } from 'rxjs/Rx';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';


@Component({	
    selector: 'admin',	
	  templateUrl: `app/admin/view-examiners/view-examiners.component.html`,
    styleUrls: ['app/admin/view-examiners/view-examiners.component.css']
})



export	class	ViewExaminersComponent implements OnInit	{
    
    private examiners:Examiner[];
    private selectedExaminerModal:Examiner = null;
    private selectedExaminer:Examiner = new Examiner();

    messageDelete='';

    constructor(private _router: Router, private examinerService:ExaminerService) { }

    ngOnInit(){
        this.examinerService.getExaminers()
            .subscribe(data => this.successGetExaminers(data),
                       error => this.failGetExaminers(error));
    }



    private isSelected(id:number):boolean{
        return id === this.selectedExaminer.id;
    }

    private selectRow(examiner:Examiner):void{
        this.selectedExaminer = examiner;
    }

    successGetExaminers(data:any){
            this.examiners = data;
    }

    failGetExaminers(error:any){
            this._router.navigate(['/loginadmin']);
    }



    deleteExaminer(){
        this.hideChildModal();

    }


   @ViewChild('deleteModal') public childModal:ModalDirective;
 
     /**
     * Shows modal
     */

    public showChildModal():void {
        this.childModal.show();
    }
    
    /**
     * Hides modal
     */
    public hideChildModal():void {
        this.childModal.hide();
    }


}	
