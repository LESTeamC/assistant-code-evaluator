import { Injector, ComponentFactoryResolver, ModuleWithProviders, NgZone } from '@angular/core';
import { MdlDialogOutletService } from '../dialog-outlet/mdl-dialog-outlet.service';
import { Observable } from 'rxjs/Observable';
export declare class MdlSnackbarComponent {
    private ngZone;
    message: string;
    actionText: string;
    private showIt;
    onAction: () => void;
    constructor(ngZone: NgZone);
    onClick(): void;
    isActive(): boolean;
    show(): Observable<void>;
    hide(): Observable<void>;
}
export interface IMdlSnackbarMessage {
    message: string;
    timeout?: number;
    action?: {
        handler: () => void;
        text: string;
    };
}
export declare class MdlSnackbarService {
    private injector;
    private componentFactoryResolver;
    private dialogOutletService;
    private cFactory;
    constructor(injector: Injector, componentFactoryResolver: ComponentFactoryResolver, dialogOutletService: MdlDialogOutletService);
    showToast(message: string, timeout?: number): Observable<MdlSnackbarComponent>;
    showSnackbar(snackbarMessage: IMdlSnackbarMessage): Observable<MdlSnackbarComponent>;
}
export declare class MdlSnackbaModule {
    static forRoot(): ModuleWithProviders;
}
