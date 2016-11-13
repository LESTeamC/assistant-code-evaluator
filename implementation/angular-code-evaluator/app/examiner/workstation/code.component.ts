import {Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit}	from '@angular/core';

declare var hljs: any;

@Component({
    moduleId: module.id,
    selector: 'student-code',
    template: `
    <div class="panel panel-default">
        <div class="panel-heading">
            <p>Submission Code</p>
        </div>
        <div class="panel-body">
            <pre>
                <code #code class="highlight">
                    <ng-content></ng-content>
                </code>
            </pre>
        </div>
    </div>
    `
    //templateUrl: 'code.component.html'
})
export class CodeComponent implements OnInit, AfterViewInit {
    
    @Input('code-language') codeLanguage:string = "java";

    constructor() { }

    ngOnInit() { }

    @ViewChild('code') codeElement: ElementRef;

    ngAfterViewInit() {
        hljs.highlightBlock(this.codeElement.nativeElement);
    }
}