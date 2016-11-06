import {Component, OnInit}	from '@angular/core';
import {Router} from '@angular/router';

@Component({	
    selector: 'create-examiners',	
	templateUrl: 'app/admin/create-examiners/create-examiners.component.html',
    styleUrls: ['app/admin/create-examiners/create-examiners.component.css'],
})
export	class	CreateExaminersComponent implements OnInit	{

    constructor(private _router:Router){}

    ngOnInit(){
        console.log("create examiners");
    }
}	
