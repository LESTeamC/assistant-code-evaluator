import {Component, OnInit, ViewChild}	from '@angular/core';
import {Router} from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import {ImportSubmissionComponent} from './import-submission.component';

import {Exam} from './../../model/exam'

import {ExamService} from './../exam.service'

@Component({	
    selector: 'view-exams',
    templateUrl: 'app/admin/view-exams/view-exams.component.html',
    styleUrls: ['app/admin/view-exams/view-exams.component.css'],
})

export	class	ViewExamsComponent implements OnInit	{

    constructor(private _router:Router, private examService:ExamService){}

    private exams:Exam[] = new Array<Exam>();

    messageEdit='';
    messageDelete='';
    messageExport='';
    messageGlobal='';
    messageImport='';

    ngOnInit(){
        console.log("view exams");

        this.examService.getExams()
            .subscribe(data => this.examsSuccess(data),
                       error => this.examsFail(error));
        
    }

    examsSuccess(data:any){
        this.exams = data;
    }

    examsFail(error:any){
        console.log("faaaiiiillllllll!!!!!!! ABORT")
    }

    editExams(){
        this.messageEdit='Go to edit exams page!';
    }

    deleteExams(){
        this.messageDelete='are u sure?';
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


    exportGrade(){
        this.messageExport='Go to export page!';
    }

    importSubmission(){
        //this.messageImport='Go to import page!';
        this._router.navigate(['/admin/import-submission']);
    }

    globalView(){
        this._router.navigate(['/admin/global-view/', 1])
    }
}	