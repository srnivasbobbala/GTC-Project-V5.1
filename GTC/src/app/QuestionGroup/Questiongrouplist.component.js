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
        this.groupCategory = "";
        this.statusMessage = "Loading Data";
        this.qdata = "";
        this.profileDetails = [];
        this.questionData = {
            questionId: 0,
            questionName: "",
            questionValue: ""
        };
    }
    QuestionGroupListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._quetionGroupService.getQuestionGroupList().subscribe(function (quegrpList) { _this.questionGroupList = quegrpList, console.log(_this.questionGroupList.Result); }, function (error) {
            _this.statusMessage = "problem with service please try again after some time";
            console.log(_this.statusMessage);
        });
    };
    QuestionGroupListComponent.prototype.getGroupById = function (group) {
        var _this = this;
        this.groupCategory = group.Category;
        this._quetionGroupService.getQuestionDetailsById(group.ID).subscribe(function (data) { _this.questionDetails = data, console.log(_this.questionDetails); }, function (error) {
            _this.statusMessage = "problem with service please try again after some time";
            console.log(_this.statusMessage);
        });
    };
    //onDropDownChange(question: any, questionvalues: any) {
    //    console.log(question);
    //    console.log(questionvalues);
    //}
    QuestionGroupListComponent.prototype.onChange = function (question, questionvalues) {
        var _this = this;
        var hasQuestion = this.profileDetails.find(function (o) { return o.questionId === question.ID; });
        if (this.profileDetails.length == 0 || hasQuestion == undefined)
            this.profileDetails.push({ questionId: question.ID, questionName: question.Question, questionValue: questionvalues });
        else {
            var obj = this.profileDetails.find(function (o, i) {
                if (o.questionId === question.ID) {
                    _this.profileDetails[i].questionValue = questionvalues;
                    return true; // stop searching
                }
            });
        }
        console.log(this.profileDetails);
    };
    QuestionGroupListComponent.prototype.saveData = function (questionsData) {
        var _this = this;
        this._quetionGroupService.saveQuestionData(questionsData).subscribe(function (data) { _this.qdata = data, console.log(_this.qdata); }, function (error) {
            _this.statusMessage = "problem with service please try again after some time";
            console.log(_this.statusMessage);
        });
    };
    QuestionGroupListComponent = __decorate([
        core_1.Component({
            selector: '<list-group>',
            templateUrl: './Questiongrouplist.component.html',
        }),
        __metadata("design:paramtypes", [QuestionGroupService_1.QuestionGroupService])
    ], QuestionGroupListComponent);
    return QuestionGroupListComponent;
}());
exports.QuestionGroupListComponent = QuestionGroupListComponent;
//# sourceMappingURL=Questiongrouplist.component.js.map