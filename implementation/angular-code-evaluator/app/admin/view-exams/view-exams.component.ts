import {Component, OnInit, ViewChild}	from '@angular/core';
import {Router} from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import {ImportSubmissionComponent} from './import-submission.component';

import {ExamService} from './../exam.service'
import {CSVService} from './../csv.service'

import {Exam} from './../../model/exam'
import {Grade} from './../../model/grade'


@Component({	
    selector: 'view-exams',
    templateUrl: 'app/admin/view-exams/view-exams.component.html',
    styleUrls: ['app/admin/view-exams/view-exams.component.css'],
})

export	class	ViewExamsComponent implements OnInit	{

    private exams:Exam[] = new Array<Exam>();
    private exportedGrades:Grade[] = new Array<Grade>();

    private selectedExam:Exam = new Exam();
    constructor(private _router:Router, private examService:ExamService,
                    private csvService:CSVService){}

    private deleteSuccess:boolean = false;
    private deleteFail: boolean = false;
    private exportFail: boolean = false;
    
    private selectedSorter:string = "date";

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
        
        this.examService.getGrades(this.selectedExam.id)
            .subscribe(data => this.successGrades(data),
                        error => this.failGrades(error));

    }

    successGrades(data:any){
        this.exportedGrades = data;

        if (!this.csvService.downloadCSV(this.exportedGrades, this.selectedExam.exercises, this.selectedExam.name))
            this.exportFail = true;
    }

    failGrades(error:any){

    }

    importSubmission(){
        this._router.navigate(['/admin/import-submission', this.selectedExam.id]);
    }

    globalView(){
        this._router.navigate(['/admin/global-view/', this.selectedExam.id])
    }

    deleteExam(){
        this.hideChildModal();
        this.examService.deleteExam(this.selectedExam.id)
            .subscribe(data => this.deleteExamSuccess(data),
                       error => this.deleteExamFail(error));
    }

    deleteExamSuccess(data:any){

        this.exams = this.removeFromArray(this.exams, this.selectedExam.id);
        this.selectedExam = new Exam();

        this.exportFail = false;
        this.deleteFail = false;
        this.deleteSuccess = true;
    }

    deleteExamFail(error:any){
        this.exportFail = false;
        this.deleteFail = false;
        this.deleteSuccess = true;
    }

    private removeFromArray(array:any[], id:number): any[]{

        return array.filter(function(el) {
            return el.id !== id;
        });
    }

    changeSorter(sorter:string){
        this.selectedSorter = sorter;
    }
}	