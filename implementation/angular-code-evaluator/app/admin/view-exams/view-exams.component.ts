import {Component, OnInit}	from '@angular/core';
import {Router} from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

@Component({	
    //selector: 'admin',	
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


    exportGrade(){
        this.messageExport='Go to export page!';
    }

    visionGlobal(){
        this.messageGlobal='Go to global view page!';
    }

    importSubmission(){
        this.messageImport='Go to import page!';
    }

    globalView(){
        this._router.navigate(['/admin/global-view/'])
    }
}	