import { EventEmitter } from '@angular/core';
export declare class MdlBackdropOverlayComponent {
    clickEmitter: EventEmitter<any>;
    readonly display: string;
    private visible;
    private zIndex;
    onBackdropClick(e: any): void;
    hide(): void;
    showWithZIndex(zIndex: number): void;
}
