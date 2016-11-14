import {Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit}	from '@angular/core';

declare var hljs: any;

@Component({
    moduleId: module.id,
    selector: 'student-code',
    template: `
    <div class="panel panel-default" style="width:100%">
        <div class="panel-heading">
            <p>Submission Code</p>
        </div>
        <div class="panel-body" style="padding:0; margin:0;">
            <pre style="padding:0; margin:0; background:#FDF6E3;">
                <code style="padding:0; margin:0;" #code highlight [class]="codeLanguage">
                    <ng-content></ng-content>
                </code>
            </pre>
        </div>
    </div>
    `,
    styleUrls: ['/app/examiner/workstation/workstation.component.css']
})
export class CodeComponent implements OnInit, AfterViewInit {
    
    @Input('code-language') public codeLanguage:string = "java";

    constructor() { }

    ngOnInit() { }

    @ViewChild('code') codeElement: ElementRef;

    ngAfterViewInit() {
        hljs.highlightBlock(this.codeElement.nativeElement);
    }
}