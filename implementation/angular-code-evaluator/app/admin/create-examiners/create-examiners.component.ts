import {Component, OnInit}	from '@angular/core';
import {Router} from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

import {Examiner} from './../../model/examiner';

@Component({	
    selector: 'create-examiners',	
	templateUrl: 'app/admin/create-examiners/create-examiners.component.html',
    styleUrls: ['app/admin/create-examiners/create-examiners.component.css'],
})
export	class	CreateExaminersComponent implements OnInit	{

private Examiner = new Examiner();
private SuccessCheck:boolean;
private conflictError:boolean;
private serverError:boolean;

    constructor(private _router:Router){}

    ngOnInit(){
        console.log("create examiners");
        this.conflictError = false;
        this.Examiner.name = "";
        this.SuccessCheck = false;
    }


    onSubmit(form: any){   
        this.conflictError = false;
        this.SuccessCheck = true;
        console.log(this.Examiner);
        console.log(form.value);
    }  	

    successCreate(Examiner: any){
        console.log("Examiner Created successfully")

        this.conflictError = false;
        this.serverError = false;
        this.SuccessCheck = true;
        this.Examiner = {name : ""};
        
    }


    failCreate(error: any){

        if (error.status === 409){
            this.SuccessCheck = false;
            this.serverError = false;
            this.conflictError = true;
            console.log("error during examiner creation")
        }
        else {
            this.SuccessCheck = false;
            this.conflictError = false;
            this.serverError = true;
            console.log("other error")
        }

    }


    //email validation!??
    /*validate(control: Control): {[key: string]: any} {
        const emailRegexp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        if (control.value !== null && control.value !== "" && (control.value.length <= 5 || !emailRegexp.test(control.value))) {
            return { "email": true };
        }
        return null;
    }*/


}
