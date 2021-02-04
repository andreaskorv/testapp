import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule }   from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import * as jssha256 from 'js-sha256';

@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpClientModule, RouterModule, RouterModule.forRoot([]) ],
    declarations: [LoginComponent],
    bootstrap: [LoginComponent]
})
export class LoginModule {
}
