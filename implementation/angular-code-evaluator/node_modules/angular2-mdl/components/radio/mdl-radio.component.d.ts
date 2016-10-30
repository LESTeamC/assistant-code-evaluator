import { ElementRef, EventEmitter, Renderer, OnInit, OnDestroy, ModuleWithProviders } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare class MdlRadioGroupRegisty {
    private radioComponents;
    add(radioComponent: MdlRadioComponent): void;
    remove(radioComponent: MdlRadioComponent): void;
    select(radioComponent: MdlRadioComponent): void;
}
export declare class MdlRadioComponent implements ControlValueAccessor, OnInit, OnDestroy {
    private elementRef;
    private renderer;
    private ragioGroupRegisty;
    name: string;
    formControlName: string;
    value: any;
    disabled: boolean;
    change: EventEmitter<any>;
    optionValue: any;
    checked: boolean;
    private el;
    private onTouchedCallback;
    private onChangeCallback;
    constructor(elementRef: ElementRef, renderer: Renderer, ragioGroupRegisty: MdlRadioGroupRegisty);
    ngOnInit(): void;
    ngOnDestroy(): void;
    writeValue(optionValue: any): void;
    deselect(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    protected onFocus(): void;
    protected onBlur(): void;
    protected onClick(): void;
    private updateCheckState();
    private checkName();
    private throwNameError();
}
export declare class MdlRadioModule {
    static forRoot(): ModuleWithProviders;
}
