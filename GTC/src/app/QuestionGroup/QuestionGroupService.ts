﻿import { Component, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class QuestionGroupService {

    constructor(private _http: Http) {

    }

    getQuestionGroupList(): Observable<any> {
        return this._http.get("/api/Question/Group")
            .map((response: Response) => <any>response.json())
            .catch(this.handleError)

    }

    getQuestionDetailsById(id: any): Observable<any> {
        return this._http.get("/api/Question/QuestionByGroup?groupId=" + id)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError)

    }

    handleError(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }


}