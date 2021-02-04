import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { DashboardComponent }   from './dashboard.component';
@NgModule({
    imports:      [ BrowserModule, FormsModule ],
    declarations: [ DashboardComponent ],
    bootstrap:    [ DashboardComponent ]
})
export class DashboardModule { }