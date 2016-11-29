import {Component, OnInit, ViewChild}	from '@angular/core';
import {Router} from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import {ImportSubmissionComponent} from './import-submission.component';

import {ExamService} from './../exam.service'
import {Exam} from './../../model/exam'

@Component({	
    selector: 'view-exams',
    templateUrl: 'app/admin/view-exams/view-exams.component.html',
    styleUrls: ['app/admin/view-exams/view-exams.component.css'],
})

export	class	ViewExamsComponent implements OnInit	{

    private exams:Exam[] = new Array<Exam>();
    private selectedExam:Exam = new Exam();
    constructor(private _router:Router, private examService:ExamService){}

    messageEdit='';
    messageExport='';

    ngOnInit(){
        console.log("view exams");

         this.examService.getExams()
            .subscribe(data => this.examsSuccess(data),
                       error => this.examsFail(error));


    }

     private isSelected(id:number):boolean{
        return id === this.selectedExam.id;
    }

    private selectRow(exam:Exam):void{
        this.selectedExam = exam;
    }


    examsSuccess(data:any){
        this.exams = data;
    }

    examsFail(error:any){

    }

//Not developed yet
    editExams(){
        this.messageEdit='Edit exams funcionality not working yet.';
    }

    deleteExams(){
        //this.examService.deleteExam(this.exam);
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

//Not developed yet
    exportGrade(){
        this.messageExport='Go to export page!';
    }

    importSubmission(){
        this._router.navigate(['/admin/import-submission']);
    }

    globalView(){
        this._router.navigate(['/admin/global-view/', 1])
    }
}	