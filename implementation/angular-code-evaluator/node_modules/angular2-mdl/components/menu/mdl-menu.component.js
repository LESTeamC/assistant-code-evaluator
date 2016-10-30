var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Component, Input, ViewChild, ContentChildren, Renderer, ViewEncapsulation } from '@angular/core';
import { MdlMenuItemComponent } from './mdl-menu-item.component';
import { MdlError } from '../common/mdl-error';
var BOTTOM_LEFT = 'bottom-left';
var BOTTOM_RIGHT = 'bottom-right';
var TOP_LEFT = 'top-left';
var TOP_RIGHT = 'top-right';
var UNALIGNED = 'unaligned';
// Total duration of the menu animation.
var TRANSITION_DURATION_SECONDS = 0.3;
// The fraction of the total duration we want to use for menu item animations.
var TRANSITION_DURATION_FRACTION = 0.8;
// How long the menu stays open after choosing an option (so the user can see
// the ripple).
var CLOSE_TIMEOUT = 175;
var CSS_ALIGN_MAP = {};
CSS_ALIGN_MAP[BOTTOM_LEFT] = 'mdl-menu--bottom-left';
CSS_ALIGN_MAP[BOTTOM_RIGHT] = 'mdl-menu--bottom-right';
CSS_ALIGN_MAP[TOP_LEFT] = 'mdl-menu--top-left';
CSS_ALIGN_MAP[TOP_RIGHT] = 'mdl-menu--top-right';
CSS_ALIGN_MAP[UNALIGNED] = 'mdl-menu--unaligned';
export var MdlMenuError = (function (_super) {
    __extends(MdlMenuError, _super);
    function MdlMenuError() {
        _super.apply(this, arguments);
    }
    return MdlMenuError;
}(MdlError));
export var MdlMenuComponent = (function () {
    function MdlMenuComponent(renderer) {
        this.renderer = renderer;
        this.cssPosition = 'mdl-menu--bottom-left';
        this.isVisible = false;
    }
    MdlMenuComponent.prototype.ngOnInit = function () {
        this.cssPosition = CSS_ALIGN_MAP[this.position] || BOTTOM_LEFT;
    };
    MdlMenuComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.container = this.containerChild.nativeElement;
        this.menuElement = this.menuElementChild.nativeElement;
        this.outline = this.outlineChild.nativeElement;
        // Add a click listener to the document, to close the menu.
        var callback = function () {
            if (_this.isVisible) {
                _this.hide();
            }
        };
        this.renderer.listenGlobal('window', 'click', callback);
        this.renderer.listenGlobal('window', 'touchstart', callback);
    };
    MdlMenuComponent.prototype.toggle = function (event, mdlButton) {
        if (!mdlButton) {
            throw new MdlMenuError("MdlButtonComponent is required");
        }
        if (this.isVisible) {
            this.hide();
        }
        else {
            this.show(event, mdlButton);
        }
    };
    MdlMenuComponent.prototype.hideOnItemClicked = function () {
        var _this = this;
        // Wait some time before closing menu, so the user can see the ripple.
        setTimeout(function () {
            _this.hide();
        }, CLOSE_TIMEOUT);
    };
    MdlMenuComponent.prototype.hide = function () {
        // Remove all transition delays; menu items fade out concurrently.
        this.menuItemComponents.toArray().forEach(function (mi) {
            mi.element.style.removeProperty('transition-delay');
        });
        // Measure the inner element.
        var rect = this.menuElement.getBoundingClientRect();
        var height = rect.height;
        var width = rect.width;
        // Turn on animation, and apply the final clip. Also make invisible.
        // This triggers the transitions.
        this.menuElement.classList.add('is-animating');
        this.applyClip(height, width);
        this.container.classList.remove('is-visible');
        // Clean up after the animation is complete.
        this.addAnimationEndListener();
        this.isVisible = false;
    };
    MdlMenuComponent.prototype.show = function (event, mdlButton) {
        var _this = this;
        event.stopPropagation();
        var forElement = mdlButton.element;
        var rect = forElement.getBoundingClientRect();
        var forRect = forElement.parentElement.getBoundingClientRect();
        if (this.position == UNALIGNED) {
        }
        else if (this.position == BOTTOM_RIGHT) {
            // Position below the "for" element, aligned to its right.
            this.container.style.right = (forRect.right - rect.right) + 'px';
            this.container.style.top = forElement.offsetTop + forElement.offsetHeight + 'px';
        }
        else if (this.position == TOP_LEFT) {
            // Position above the "for" element, aligned to its left.
            this.container.style.left = forElement.offsetLeft + 'px';
            this.container.style.bottom = (forRect.bottom - rect.top) + 'px';
        }
        else if (this.position == TOP_RIGHT) {
            // Position above the "for" element, aligned to its right.
            this.container.style.right = (forRect.right - rect.right) + 'px';
            this.container.style.bottom = (forRect.bottom - rect.top) + 'px';
        }
        else {
            // Default: position below the "for" element, aligned to its left.
            this.container.style.left = forElement.offsetLeft + 'px';
            this.container.style.top = forElement.offsetTop + forElement.offsetHeight + 'px';
        }
        // Measure the inner element.
        var height = this.menuElement.getBoundingClientRect().height;
        var width = this.menuElement.getBoundingClientRect().width;
        this.container.style.width = width + 'px';
        this.container.style.height = height + 'px';
        this.outline.style.width = width + 'px';
        this.outline.style.height = height + 'px';
        var transitionDuration = TRANSITION_DURATION_SECONDS * TRANSITION_DURATION_FRACTION;
        this.menuItemComponents.toArray().forEach(function (mi) {
            var itemDelay = null;
            if ((_this.position == TOP_LEFT) || _this.position == TOP_RIGHT) {
                itemDelay = ((height - mi.element.offsetTop - mi.element.offsetHeight) / height * transitionDuration) + 's';
            }
            else {
                itemDelay = (mi.element.offsetTop / height * transitionDuration) + 's';
            }
            mi.element.style.transitionDelay = itemDelay;
        });
        // Apply the initial clip to the text before we start animating.
        this.applyClip(height, width);
        this.container.classList.add('is-visible');
        this.menuElement.style.clip = 'rect(0 ' + width + 'px ' + height + 'px 0)';
        this.menuElement.classList.add('is-animating');
        this.addAnimationEndListener();
        this.isVisible = true;
    };
    MdlMenuComponent.prototype.addAnimationEndListener = function () {
        var _this = this;
        this.renderer.listen(this.menuElement, 'transitionend', function () {
            _this.menuElement.classList.remove('is-animating');
        });
    };
    MdlMenuComponent.prototype.applyClip = function (height, width) {
        if (this.position == UNALIGNED) {
            // Do not clip.
            this.menuElement.style.clip = '';
        }
        else if (this.position == BOTTOM_RIGHT) {
            // Clip to the top right corner of the menu.
            this.menuElement.style.clip = 'rect(0 ' + width + 'px ' + '0 ' + width + 'px)';
        }
        else if (this.position == TOP_LEFT) {
            // Clip to the bottom left corner of the menu.
            this.menuElement.style.clip = 'rect(' + height + 'px 0 ' + height + 'px 0)';
        }
        else if (this.position == TOP_RIGHT) {
            // Clip to the bottom right corner of the menu.
            this.menuElement.style.clip = 'rect(' + height + 'px ' + width + 'px ' + height + 'px ' + width + 'px)';
        }
        else {
            // Default: do not clip (same as clipping to the top left corner).
            this.menuElement.style.clip = '';
        }
    };
    MdlMenuComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mdl-menu',
                    host: {},
                    exportAs: 'mdlMenu',
                    template: "\n   <div #container class=\"mdl-menu__container is-upgraded\">\n      <div #outline class=\"mdl-menu__outline\"\n         [ngClass]=\"cssPosition\"\n      ></div>\n      <div class=\"mdl-menu\" #menuElement>\n         <ng-content></ng-content>\n      </div>\n   </div>\n  ",
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    MdlMenuComponent.ctorParameters = [
        { type: Renderer, },
    ];
    MdlMenuComponent.propDecorators = {
        'position': [{ type: Input, args: ['mdl-menu-position',] },],
        'containerChild': [{ type: ViewChild, args: ['container',] },],
        'menuElementChild': [{ type: ViewChild, args: ['menuElement',] },],
        'outlineChild': [{ type: ViewChild, args: ['outline',] },],
        'menuItemComponents': [{ type: ContentChildren, args: [MdlMenuItemComponent,] },],
    };
    return MdlMenuComponent;
}());
//# sourceMappingURL=mdl-menu.component.js.map