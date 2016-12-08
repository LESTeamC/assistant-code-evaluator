import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';



@Component({
    selector: 'my-app',
    template: `
    <router-outlet></router-outlet>`
})
export class AppComponent {

    private spin:boolean = true;

    constructor(public viewContainerRef:ViewContainerRef, private router:Router){

        this.viewContainerRef = viewContainerRef;
        this.router.navigate(['/login'])

    }
 }
