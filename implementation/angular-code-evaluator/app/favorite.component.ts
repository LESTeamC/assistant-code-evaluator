import {Component, Input, Output, EventEmitter}	from 'angular2/core';

@Component({	
    selector: 'star',	
	templateUrl: 'app/favorite.template.html',
    styles: [`
        .glyphicon-star{
            color: orange;
        }
    `]
})
export class FavoriteComponent {
    @Input('is-favorite') isFav = false;

    @Output() change = new EventEmitter();

    setFav() {
        this.isFav = !this.isFav;
        this.change.emit({newValue: this.isFav});
    } 
}