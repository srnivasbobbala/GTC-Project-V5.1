﻿import { Component, OnInit } from '@angular/core';
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



}