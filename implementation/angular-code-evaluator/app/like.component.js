System.register(['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var LikeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            LikeComponent = (function () {
                function LikeComponent() {
                    this.isLiked = false;
                    this.likesnumber = 10;
                }
                LikeComponent.prototype.setLiked = function () {
                    this.isLiked = !this.isLiked;
                    if (this.isLiked) {
                        this.likesnumber += 1;
                    }
                    else {
                        this.likesnumber -= 1;
                    }
                };
                __decorate([
                    core_1.Input('is-liked'), 
                    __metadata('design:type', Object)
                ], LikeComponent.prototype, "isLiked", void 0);
                __decorate([
                    core_1.Input('total-likes'), 
                    __metadata('design:type', Object)
                ], LikeComponent.prototype, "likesnumber", void 0);
                LikeComponent = __decorate([
                    core_1.Component({
                        selector: 'heart',
                        template: "\n        <i \n            class=\"glyphicon glyphicon-heart\"\n            [class.pink]=\"isLiked\"\n            (click)=\"setLiked()\">\n        </i>\n        <span>{{likesnumber}}</span>\n    ",
                        styles: ["\n        .glyphicon-heart {\n            color: #ccc;\n            cursor: pointer;\n        }\n        .pink{\n            color: deeppink !important;\n        }\n    "]
                    }), 
                    __metadata('design:paramtypes', [])
                ], LikeComponent);
                return LikeComponent;
            }());
            exports_1("LikeComponent", LikeComponent);
        }
    }
});
//# sourceMappingURL=like.component.js.map