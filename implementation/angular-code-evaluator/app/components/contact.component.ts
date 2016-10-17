import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

@Component({
    templateUrl: '/app/templates/contact.component.html'
})
export class ContactComponent {

    constructor(private _router:Router){

    }

    onSubmit(form){
        console.log(form);
        this._router.navigate(['Albums']);
    }
}