var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Component, ElementRef, Renderer, ViewEncapsulation } from '@angular/core';
import { MdlTooltipPositionService } from './mdl-tooltip-position.service';
var IS_ACTIVE = 'is-active';
var host = {
    '[class.mdl-tooltip]': 'true',
    '[class.mdl-tooltip--large]': 'large',
    '[class.mdl-tooltip--left]': 'position=="left"',
    '[class.mdl-tooltip--right]': 'position=="right"',
    '[class.mdl-tooltip--top]': 'position=="top"',
    '[class.mdl-tooltip--bottom]': 'position=="bottom"'
};
export var MdlSimpleTooltipComponent = (function () {
    function MdlSimpleTooltipComponent(elRef, renderer, mdlTooltipPositionService) {
        this.elRef = elRef;
        this.renderer = renderer;
        this.mdlTooltipPositionService = mdlTooltipPositionService;
        this.large = false;
        this.element = elRef.nativeElement;
    }
    MdlSimpleTooltipComponent.prototype.mouseLeave = function () {
        this.renderer.setElementClass(this.elRef.nativeElement, IS_ACTIVE, false);
    };
    MdlSimpleTooltipComponent.prototype.mouseEnter = function (event) {
        var props = event.target.getBoundingClientRect();
        var offsetWidth = this.element.offsetWidth;
        var offsetHeight = this.element.offsetHeight;
        var style = this.mdlTooltipPositionService.calcStyle(offsetWidth, offsetHeight, props, this.position);
        for (var key in style) {
            this.renderer.setElementStyle(this.elRef.nativeElement, key, style[key]);
        }
        this.renderer.setElementClass(this.elRef.nativeElement, IS_ACTIVE, true);
    };
    MdlSimpleTooltipComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mdl-simple-tooltip',
                    host: host,
                    template: '<div>{{tooltipText}}</div>',
                    providers: [MdlTooltipPositionService],
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    MdlSimpleTooltipComponent.ctorParameters = [
        { type: ElementRef, },
        { type: Renderer, },
        { type: MdlTooltipPositionService, },
    ];
    return MdlSimpleTooltipComponent;
}());
export var MdlTooltipComponent = (function (_super) {
    __extends(MdlTooltipComponent, _super);
    function MdlTooltipComponent(elRef, renderer, mdlTooltipPositionService) {
        _super.call(this, elRef, renderer, mdlTooltipPositionService);
    }
    MdlTooltipComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mdl-tooltip',
                    template: '<div><ng-content></ng-content></div>',
                    exportAs: 'mdlTooltip',
                    host: host,
                    providers: [MdlTooltipPositionService],
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    MdlTooltipComponent.ctorParameters = [
        { type: ElementRef, },
        { type: Renderer, },
        { type: MdlTooltipPositionService, },
    ];
    return MdlTooltipComponent;
}(MdlSimpleTooltipComponent));
//# sourceMappingURL=mdl-tooltip.component.js.map