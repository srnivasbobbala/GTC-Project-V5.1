import { Component, OnInit } from '@angular/core';
import { QuestionGroupService } from './QuestionGroupService';
import { Observable } from 'rxjs/Observable';
@Component({
    selector: '<list-group>',
    templateUrl: './Questiongrouplist.component.html',
})


export class QuestionGroupListComponent implements OnInit {

    questionGroupList: any;
  
    statusMessage: string = "Loading Data";

    constructor(private _quetionGroupService: QuestionGroupService) {


    }
    ngOnInit() {
        this._quetionGroupService.getQuestionGroupList().subscribe((quegrpList) => { this.questionGroupList = quegrpList, console.log(this.questionGroupList.Result); },
            (error) => {
                this.statusMessage = "problem with service please try again after some time";
                console.log(this.statusMessage);
            });
    }
}