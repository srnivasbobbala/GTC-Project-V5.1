import { Component, OnInit } from '@angular/core';
import { QuestionGroupService } from './QuestionGroupService';
@Component({

    selector: '<list-employee>',
    templateUrl: './QuestionGroup/Questiongrouplist.component.html'



})


export class QuestionGroupListComponent implements OnInit {

    questionGroupList: any;
    statusMessage: string = "Loading Data";

    constructor(private _quetionGroupService: QuestionGroupService) {


    }
    ngOnInit() {
        this._quetionGroupService.getQuestionGroupList().subscribe((quegrpList) => this.questionGroupList = quegrpList,
            (error) => {
                this.statusMessage = "problem with service please try again after some time";
                console.log(this.statusMessage);
            });

    }


}