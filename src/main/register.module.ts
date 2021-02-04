import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule }   from '@angular/common/http';
import { RegisterComponent }   from './register.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpClientModule, RouterModule, RouterModule.forRoot([]) ],
    declarations: [ RegisterComponent ],
    bootstrap:    [ RegisterComponent ]
})
export class RegisterModule { }