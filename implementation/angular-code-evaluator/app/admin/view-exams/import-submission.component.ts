import {Component, OnInit}	from '@angular/core';
import {Router} from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import {ViewExamsComponent} from './view-exams.component';

import {UploadService} from './../upload.service'

@Component({	
    selector: 'import-submission',
    templateUrl: 'app/admin/view-exams/import-submission.component.html',
    styleUrls: ['app/admin/view-exams/import-submission.component.css'],
})

export	class	ImportSubmissionComponent implements OnInit	{

    constructor(private _router:Router, private uploadService:UploadService){}

    ngOnInit(){
        console.log("import submission");
    }

    importSubmissions($event:any){
        console.log("IMPORT")

        var files:any = $event.target.files;
        console.log(files);

        this.uploadService.uploadLibraries(files)
                .subscribe(data => this.successImport(data),
                error => this.failImport(error));
    }

    successImport(data:any){console.log("yey")}
    failImport(error:any){console.log(error)}

}