import { Component, OnInit } from '@angular/core';
import { QuestionGroupService } from './QuestionGroupService';
import { Observable } from 'rxjs/Observable';
@Component({
    selector: '<list-group>',
    templateUrl: './Questiongrouplist.component.html',
})


export class QuestionGroupListComponent implements OnInit {

    questionGroupList: any;
    groupCategory = "";
    statusMessage: string = "Loading Data";
    questionDetails: any;
    qdata: any = "";
    suceess: any = false;
    fail: any = false;
    profileDetails: Array<any> = [];
    questionData = {
        questionId: 0,
        questionName: "",
        questionValue: ""
    };

    constructor(private _quetionGroupService: QuestionGroupService) {
    }
    ngOnInit() {
        this._quetionGroupService.getQuestionGroupList().subscribe((quegrpList) => { this.questionGroupList = quegrpList, console.log(this.questionGroupList.Result); },
            (error) => {
                this.statusMessage = "problem with service please try again after some time";
                console.log(this.statusMessage);
            });
    }

    getGroupById(group: any) {
        this.groupCategory = group.Category;
        this._quetionGroupService.getQuestionDetailsById(group.ID).subscribe((data) => { this.questionDetails = data, console.log(this.questionDetails); },
            (error) => {
                this.statusMessage = "problem with service please try again after some time";
                console.log(this.statusMessage);
            });
    }

    //onDropDownChange(question: any, questionvalues: any) {
    //    console.log(question);
    //    console.log(questionvalues);
    //}

    onChange(question: any, questionvalues: any) {

        let hasQuestion = this.profileDetails.find(o => o.questionId === question.ID);

        if (this.profileDetails.length == 0 || hasQuestion == undefined)
            this.profileDetails.push({ questionId: question.ID, questionName: question.Question, questionValue: questionvalues });
        else {
            let obj = this.profileDetails.find((o, i) => {
                if (o.questionId === question.ID) {
                    this.profileDetails[i].questionValue = questionvalues;
                    return true; // stop searching
                }
            });
        }
        console.log(this.profileDetails);
    }

    saveData(questionsData: any) {

        this._quetionGroupService.saveQuestionData(questionsData).subscribe((data) => {
            this.qdata = data;

            if (this.qdata.ResponseId == 1) {
                this.suceess = true;
                //setTimeout(function () {
                //    this.suceess = false;
                //}.bind(this), 3000);
            }
            else {

                this.fail = true;
                //setTimeout(function () {
                //    this.fail = false;
                //}.bind(this), 3000);
            }


        },
            (error) => {
                this.statusMessage = "problem with service please try again after some time";
                console.log(this.statusMessage);
            });
    }

    LoadModule() {

        console.log("nextmodule");
    }

    msgDisable() {

        this.suceess = false;
        this.fail = false;
    }

}