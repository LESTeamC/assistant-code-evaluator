import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {AlbumComponent} from './components/album.component';
import {AlbumsComponent} from './components/albums.component';
import {ContactComponent} from './components/contact.component';
import {LoginComponent} from './components/login.component';


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

    { path: '/login',
    name: 'Login',
    component: LoginComponent
    },

    { path: '/*other',
    name: 'Other',
    redirectTo: ['Albums']
    }
])
@Component({
    selector: 'my-app',
    templateUrl: '/app/templates/app.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class AppComponent {

    constructor(private _router:Router){
        this._router.navigate(['Login']);
    }
    
}