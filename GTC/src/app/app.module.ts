import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { QuestionGroupListComponent } from './QuestionGroup/Questiongrouplist.component';
import { HomeComponent } from './Home.component';
import { QuestionGroupService } from './QuestionGroup/QuestionGroupService';
@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule],
    declarations: [AppComponent, HomeComponent, QuestionGroupListComponent],
    bootstrap: [AppComponent],
    providers: [QuestionGroupService]
})
export class AppModule { }
