import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {AlbumComponent} from './album.component';
import {AlbumsComponent} from './albums.component';
import {ContactComponent} from './contact.component';


@RouteConfig([
    { path: '/albums',
    name: 'Albums',
    component: AlbumsComponent,
    useAsDefault: true
    },
    
    { path: '/contacts',
    name: 'Contact',
    component: ContactComponent
    },

    { path: '/albums/:id',
    name: 'Album',
    component: AlbumComponent
    },

    { path: '/*other',
    name: 'Other',
    redirectTo: ['Albums']
    }
])
@Component({
    selector: 'my-app',
    templateUrl: '/app/app.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class AppComponent {
}