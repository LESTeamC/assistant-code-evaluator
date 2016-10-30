import { Component, Injectable, Injector, ComponentFactoryResolver, NgModule, ViewEncapsulation, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdlDialogOutletService } from '../dialog-outlet/mdl-dialog-outlet.service';
import { MdlDialogOutletModule } from '../dialog-outlet/index';
import { Subject } from 'rxjs/Subject';
var ANIMATION_TIME = 250;
export var MdlSnackbarComponent = (function () {
    function MdlSnackbarComponent(ngZone) {
        this.ngZone = ngZone;
        this.showIt = false;
    }
    MdlSnackbarComponent.prototype.onClick = function () {
        this.onAction();
    };
    MdlSnackbarComponent.prototype.isActive = function () {
        return this.showIt;
    };
    MdlSnackbarComponent.prototype.show = function () {
        var _this = this;
        var result = new Subject();
        // wait unit the dom is in place - then showIt will change the css class
        setTimeout(function () {
            _this.showIt = true;
            // fire after the view animation is done
            setTimeout(function () {
                result.next(null);
                result.complete();
            }, ANIMATION_TIME);
        }, 10);
        return result.asObservable();
    };
    MdlSnackbarComponent.prototype.hide = function () {
        this.showIt = false;
        var result = new Subject();
        // fire after the view animation is done
        setTimeout(function () {
            result.next(null);
            result.complete();
        }, ANIMATION_TIME);
        return result.asObservable();
    };
    MdlSnackbarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mdl-snackbar-component',
                    template: "\n    <div id=\"demo-toast-example\" class=\" mdl-snackbar\" [ngClass]=\"{'mdl-snackbar--active': showIt }\">\n      <div class=\"mdl-snackbar__text\">{{message}}</div>\n      <button *ngIf=\"onAction\" class=\"mdl-snackbar__action\" type=\"button\" (click)=\"onClick()\" >{{actionText}}</button>\n    </div>\n  ",
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    MdlSnackbarComponent.ctorParameters = [
        { type: NgZone, },
    ];
    return MdlSnackbarComponent;
}());
export var MdlSnackbarService = (function () {
    function MdlSnackbarService(injector, componentFactoryResolver, dialogOutletService) {
        this.injector = injector;
        this.componentFactoryResolver = componentFactoryResolver;
        this.dialogOutletService = dialogOutletService;
        this.cFactory = this.componentFactoryResolver.resolveComponentFactory(MdlSnackbarComponent);
    }
    MdlSnackbarService.prototype.showToast = function (message, timeout) {
        return this.showSnackbar({
            message: message,
            timeout: timeout
        });
    };
    MdlSnackbarService.prototype.showSnackbar = function (snackbarMessage) {
        var optTimeout = snackbarMessage.timeout || 2750;
        var viewContainerRef = this.dialogOutletService.viewContainerRef;
        if (!viewContainerRef) {
            throw new Error('You did not provide a ViewContainerRef. ' +
                'Please see https://github.com/mseemann/angular2-mdl/wiki/How-to-use-the-MdlDialogService');
        }
        var cRef = viewContainerRef.createComponent(this.cFactory, viewContainerRef.length);
        var mdlSnackbarComponent = cRef.instance;
        mdlSnackbarComponent.message = snackbarMessage.message;
        // TODO make sure only one snackbar is visible at one time
        // observable? push the configured instance and consume one after another?
        if (snackbarMessage.action) {
            mdlSnackbarComponent.actionText = snackbarMessage.action.text;
            mdlSnackbarComponent.onAction = function () {
                mdlSnackbarComponent.hide().subscribe(function () {
                    cRef.destroy();
                    snackbarMessage.action.handler();
                });
            };
        }
        else {
            setTimeout(function () {
                mdlSnackbarComponent.hide().subscribe(function () { cRef.destroy(); });
            }, optTimeout);
        }
        var result = new Subject();
        mdlSnackbarComponent.show().subscribe(function () {
            result.next(mdlSnackbarComponent);
            result.complete();
        });
        return result.asObservable();
    };
    MdlSnackbarService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    MdlSnackbarService.ctorParameters = [
        { type: Injector, },
        { type: ComponentFactoryResolver, },
        { type: MdlDialogOutletService, },
    ];
    return MdlSnackbarService;
}());
export var MdlSnackbaModule = (function () {
    function MdlSnackbaModule() {
    }
    MdlSnackbaModule.forRoot = function () {
        return {
            ngModule: MdlSnackbaModule,
            providers: [MdlSnackbarService]
        };
    };
    MdlSnackbaModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, MdlDialogOutletModule.forRoot()],
                    exports: [MdlSnackbarComponent],
                    declarations: [MdlSnackbarComponent],
                    entryComponents: [MdlSnackbarComponent]
                },] },
    ];
    /** @nocollapse */
    MdlSnackbaModule.ctorParameters = [];
    return MdlSnackbaModule;
}());
//# sourceMappingURL=mdl-snackbar.service.js.map