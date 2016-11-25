import {Component, OnInit, ViewChild}	from '@angular/core';
import {Router} from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import {ImportSubmission} from './import-submission.component';

@Component({	
    selector: 'view-exams',
    templateUrl: 'app/admin/view-exams/view-exams.component.html',
    styleUrls: ['app/admin/view-exams/view-exams.component.css'],
})

export	class	ViewExamsComponent implements OnInit	{

    constructor(private _router:Router){}

    messageEdit='';
    messageDelete='';
    messageExport='';
    messageGlobal='';
    messageImport='';

    ngOnInit(){
        console.log("view exams");
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

    visionGlobal(){
        this.messageGlobal='Go to global view page!';
    }

    importSubmission(){
        //this.messageImport='Go to import page!';
        this._router.navigate(['/admin/import-submission']);
    }

    globalView(){
        this._router.navigate(['/admin/global-view/'])
    }
}	