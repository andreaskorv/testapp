import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AddclientComponent }   from './Addclient.component';
@NgModule({
    imports:      [ BrowserModule, FormsModule ],
    declarations: [ AddclientComponent ],
    bootstrap:    [ AddclientComponent ]
})
export class AddclientModule { }