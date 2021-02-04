import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CookieService }    from 'ngx-cookie-service';
import { DOCUMENT } from '@angular/common';
import * as shajs from 'sha.js';
     
export class Category{
    category: string
}

export class Key{
    key: string
}

export class User{
    id: number;
    status: string;
}
 
@Component({
    selector: 'main',
    template: `
    <header class="col-xs-12 buttonright">
    <div *ngIf="cookieValue==''">
        <button class="btn-lg" (click)="setHref('register')" data-toggle="modal" data-target="#choose" style="float:right">Provider</button>
        <button class="btn-lg" (click)="setHref('addclient')" data-toggle="modal" data-target="#choose" style="float:right">Client</button>
    </div>
    <div *ngIf="cookieValue=='provider'">
        <button class="btn-lg" style="float:right" (click)="switch('/dashboard')">Dashboard</button>
        <button class="btn-lg" style="float:right" (click)="logout()">Logout</button>
    </div>
    <div *ngIf="cookieValue=='client'">
        <button class="btn-lg" style="float:right" (click)="switch('/orders')">Orders</button>
        <button class="btn-lg" style="float:right" (click)="logout()">Logout</button>
    </div>
    </header>
    <div class="row">
        <div class="col-xs-3">
            <table class="frm">
            <tr *ngFor="let item of services">
            <td (click)='routeTo(item.category)'>
              <button class="btn-lg btn-block">{{item.category}}</button>
            </td>
          </tr>
            </table>
        </div>
        <div class="col-xs-9">
        
        </div>
    </div>
    <div class="modal mainmodal" id="choose" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <a data-dismiss="modal" (click)="switch('/login')">Войдите</a> или <a data-dismiss="modal" (click)="toRegister()">зарегистрируйтесь</a>.<br>
        <div class="modal-footer"><button data-dismiss="modal" class="close" aria-label="Close">Отмена</button></div>
    </div>`,
    styleUrls: ["../assets/styles.css"]
})
export class HomeComponent implements OnInit { 
 
    services: Category[] = [];
    cookieValue: string;
    modalHref: string;
    
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        private cookieService: CookieService,
        @Inject(DOCUMENT) private _document: Document
        ){

        }
     
    ngOnInit()
    {
        this.cookieValue = this.cookieService.get("status");
        this.http.post('http://localhost:3000/getcategories', []).subscribe((data:Category[]) => this.services=data);
    }

    routeTo(address: string)
    {
        this.router.navigate(["sales"], {relativeTo: this.route, queryParams: {category: address}});
    }

    switch(address: string)
    {
        this.router.navigate([address], {});
    }

    setHref(forHref: string)
    {
        this.modalHref = forHref;
    }

    toRegister()
    {
        this.router.navigate([this.modalHref], {});
    }

    logout()
    {
        this.cookieService.delete("status");
        this.cookieService.delete("user");
        this._document.defaultView.location.reload();
    }
}