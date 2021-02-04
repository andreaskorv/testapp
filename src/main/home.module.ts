import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule }   from '@angular/common/http';
import { HomeComponent }   from './home.component';
import { Routes, RouterModule } from '@angular/router';

@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpClientModule, RouterModule, RouterModule.forRoot([]) ],
    declarations: [ HomeComponent ],
    bootstrap:    [ HomeComponent ]
})
export class HomeModule { }