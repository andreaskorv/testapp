import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { SalesComponent }   from './sales.component';
@NgModule({
    imports:      [ BrowserModule, FormsModule ],
    declarations: [ SalesComponent ],
    bootstrap:    [ SalesComponent ]
})
export class SalesModule { }