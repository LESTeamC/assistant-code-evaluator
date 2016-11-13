import {Component, OnInit, ElementRef, ViewChild}	from '@angular/core';
import {Router} from '@angular/router';

@Component({	
    selector: 'workstation',	
	template: `<h1>WORKSTATION</h1>

    <student-code [code-language]="html">
        {{code}}
    </student-code>
    `,
})
export	class	WorkstationComponent implements OnInit	{

    constructor(private _router:Router){}
    
    private code:string="";

    ngOnInit(){
        console.log("WORKSTATION");
    }
}	