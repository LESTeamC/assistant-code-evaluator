import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { ViewExamsComponent } from './view-exams.component';

import { Exam } from './../../model/exam'

import { ExamService } from './../exam.service'
import { UploadService } from './../upload.service'
import { ZipService } from './../zip.service'

import { StudentExercises } from './../../model/student-exercises'


@Component({
    selector: 'import-submission',
    templateUrl: 'app/admin/view-exams/import-submission.component.html',
    styleUrls: ['app/admin/view-exams/import-submission.component.css'],
})

export class ImportSubmissionComponent implements OnInit {

    private submissions: StudentExercises[] = new Array<StudentExercises>();
    private fileNames: string[] = new Array<string>();

    private files: FileList = null;

    private exam: Exam = new Exam();
    private exercises: string[] = new Array<string>();
    private imported: boolean = false;

    private zipError: boolean = false;
    private uploadSuccess: boolean = false;
    private uploadFail: boolean = false;

    private errorMessage: string = "";

    constructor(private _router: Router, private uploadService: UploadService,
        private zipService: ZipService, private activatedRoute: ActivatedRoute,
        private examService: ExamService) { }

    ngOnInit() {

        this.activatedRoute.params
            // (+) converts string 'id' to a number
            .switchMap((params: Params) => this.examService.getExam(+params['id']))
            .subscribe(data => this.examSuccess(data),
            error => this.examFail(error));
    }

    examSuccess(data: any) {
        this.exam = data;

        this.exercises = this.getExerciseNames();
    }

    examFail(eror: any) {
        this._router.navigate(['/admin/view-exams']);
    }

    importSubmissions($event: any) {

        this.files = $event.target.files;
        this.zipService.getNamesFromZip(this.files[0])
            .subscribe((data: any) => this.successImport(data),
                    (error: any) => this.failImport(error));

    }

    successImport(data: any) {
        this.fileNames = data;

        try{
            this.calculateMatchingTable();
        }catch(err){
            this.zipError = true;
        }

        this.zipError = false;
        this.imported = true;
    }

    failImport(error: any) { 
        this.zipError = true;
    }

    private getDataFromFile(fileName: string): void {

        if (fileName.match(/(.c)$/g) !== null && fileName.match(/(.c)$/g).length > 0) {
            var student = fileName.match(/^[A-Za-z0-9]+/g)[0];
            var exercise = fileName.match(/_(.*)\./g)[0].replace("_", "").replace(".", "");

            var studentInList: number = this.existsStudent(student);
            if (studentInList >= 0) {
                if (this.getExerciseNames().includes(exercise))
                    this.submissions[studentInList].addExercise(exercise);
            } else {
                var newSubmission: StudentExercises = new StudentExercises(student);
                if (this.getExerciseNames().includes(exercise)) {
                    newSubmission.addExercise(exercise);
                }
                this.submissions.push(newSubmission);
            }
        } else {
            this.submissions.push(new StudentExercises(fileName.match(/^[A-Za-z0-9]+/g)[0]));
        }
    }

    calculateMatchingTable() {
        for (let i = 0; i < this.fileNames.length; i++) {
            this.getDataFromFile(this.fileNames[i]);
        }

        this.addExamStudents();
    }

    private addExamStudents() {
        for (let i = 0; i < this.exam.students.length; i++) {
            var studentUsername = this.exam.students[i].username;
            var studentExists = this.existsStudent(studentUsername);

            if (studentExists < 0) {
                // Register does not exist, so create one with username
                var newSubmission: StudentExercises = new StudentExercises(studentUsername);
                newSubmission.name = this.exam.students[i].name;
                this.submissions.push(new StudentExercises(studentUsername));
            } else {
                //else, add username
                this.submissions[studentExists].name = this.exam.students[i].name;
            }
        }
    }

    private existsStudent(studentUsername: string) {
        for (var i = 0; i < this.submissions.length; i++) {
            if (this.submissions[i].username === studentUsername) {
                return i;
            }
        }
        return -1;
    }

    public getExerciseNames() {
        let exArray: string[] = new Array<string>();
        for (let i = 0; i < this.exam.exercises.length; i++) {
            exArray.push(this.exam.exercises[i].name);
        }
        return exArray;
    }

    isOK(studentExercises: StudentExercises) {
        return studentExercises.exercises.length === this.exam.exercises.length;
    }

    cancelImport() {
        this.imported = false;

        this.submissions = new Array<StudentExercises>();
        this.fileNames = new Array<string>();
    }

    uploadFile() {
        this.zipError = false;
        this.uploadService.uploadSubmissions(this.files, this.exam.id)
            .subscribe((data: any) => this.successUpload(data),
                    (error: any) => this.failUpload(error));
    }

    failUpload(error:any){
        this.zipError = false;
        this.uploadSuccess = false;
        this.uploadFail = true

        this.errorMessage = error._body;
    }

    successUpload(data:any){
        this.zipError = false;
        this.uploadFail = false;
        this.uploadSuccess = true;
    }
}