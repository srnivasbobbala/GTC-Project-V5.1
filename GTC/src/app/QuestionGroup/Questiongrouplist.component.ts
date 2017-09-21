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

    onDropDownChange(question: any, questionvalues: any) {
        console.log(question);
        console.log(questionvalues);
    }

    onChange(question: any, questionvalues: any) {
        this.questionData.questionId = question.ID;
        this.questionData.questionName = question.Question;
        this.questionData.questionValue = questionvalues;

        if (this.profileDetails.length == 0) {

            this.profileDetails.push(this.questionData);

        }
        else {

            

        }


        console.log(question);
        console.log(questionvalues);
    }



}