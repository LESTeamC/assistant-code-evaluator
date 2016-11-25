import {Component, OnInit}	from '@angular/core';
import {Router} from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import {ViewExamsComponent} from './view-exams.component';

@Component({	
    selector: 'import-submission',
    templateUrl: 'app/admin/view-exams/import-submission.component.html',
    styleUrls: ['app/admin/view-exams/import-submission.component.css'],
})

export	class	ImportSubmissionComponent implements OnInit	{

    constructor(private _router:Router){}

    ngOnInit(){
        console.log("import submission");
    }

    importSubmissions(){
        console.log("IMPORT")
    }

}