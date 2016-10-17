import {Component, Input, EventEmitter}	from 'angular2/core';

@Component({	
    selector: 'heart',	
	template: `
        <i 
            class="glyphicon glyphicon-heart"
            [class.pink]="isLiked"
            (click)="setLiked()">
        </i>
        <span>{{likesnumber}}</span>
    `,

    styles: [`
        .glyphicon-heart {
            color: #ccc;
            cursor: pointer;
        }
        .pink{
            color: deeppink !important;
        }
    `]
})
export class LikeComponent {
    @Input('is-liked') isLiked = false;

    @Input('total-likes') likesnumber = 10;

    setLiked() {
        this.isLiked = !this.isLiked;
        if(this.isLiked){
            this.likesnumber += 1;
        } else{
            this.likesnumber -= 1;
        }
    } 
}