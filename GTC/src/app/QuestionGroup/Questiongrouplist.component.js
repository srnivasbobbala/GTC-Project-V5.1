"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var QuestionGroupService_1 = require("./QuestionGroupService");
var QuestionGroupListComponent = (function () {
    function QuestionGroupListComponent(_quetionGroupService) {
        this._quetionGroupService = _quetionGroupService;
        this.statusMessage = "Loading Data";
    }
    QuestionGroupListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._quetionGroupService.getQuestionGroupList().subscribe(function (quegrpList) { _this.questionGroupList = quegrpList, console.log(_this.questionGroupList.Result); }, function (error) {
            _this.statusMessage = "problem with service please try again after some time";
            console.log(_this.statusMessage);
        });
    };
    QuestionGroupListComponent = __decorate([
        core_1.Component({
            selector: '<list-group>',
            templateUrl: './Questiongrouplist.component.html'
        }),
        __metadata("design:paramtypes", [QuestionGroupService_1.QuestionGroupService])
    ], QuestionGroupListComponent);
    return QuestionGroupListComponent;
}());
exports.QuestionGroupListComponent = QuestionGroupListComponent;
//# sourceMappingURL=Questiongrouplist.component.js.map