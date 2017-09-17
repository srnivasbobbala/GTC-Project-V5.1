import { Component, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class QuestionGroupService {

    constructor(private _http: Http) {

    }

    getQuestionGroupList(): Observable<any> {
        return this._http.get("http://localhost:1934/api/GTC/GetGroup")
            .map((response: Response) => <any>response.json());

    }

}