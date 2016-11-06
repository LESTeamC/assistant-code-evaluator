import {Component, OnInit}	from '@angular/core';
import {Router} from '@angular/router';

@Component({	
    selector: 'admin',	
	templateUrl: '/app/admin/admin.component.html',
    styleUrls: ['app/admin/admin.component.css']
})
export	class	AdminComponent implements OnInit	{

    constructor(private _router:Router){}

    ngOnInit(){
        console.log("home");
    }
}	
