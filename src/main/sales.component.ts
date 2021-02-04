import { Component } from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { Service } from './register.component';
import { ValidatorFn } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

export class Sale{
    public id: number;
    public organization: string;
    public avatar: string;
}
 
@Component({
    selector: 'sales',
    template: `<h3>{{category}}</h3>
    <div class="grid">
        <div class="sale" *ngFor="let item of sales" (click)="getServices(item.id)" data-toggle="modal" data-target="#addorder">
            <figure class="sign">
                <p><img [src]="getImage(item.avatar)" width="190" height="112"></p>
                <figcaption>{{item.organization}}</figcaption>
            </figure>
        </div>
    </div>
    <div id="addorder" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <form>
    <div *ngIf="cookieValue=='client'">
        <p>Ваше имя:</p>
        <input type="text" name="_client" [(ngModel)]="client" #_client="ngModel" required>
        <div [hidden]="_client.valid || _client.untouched" class="alert alert-danger">
            Не указано имя
        </div>
        <p>Ваш телефон:</p>
        <input type="text" name="_phone" [(ngModel)]="phone" #_phone="ngModel" required>
        <div [hidden]="_phone.valid || _phone.untouched" class="alert alert-danger">
            Не указан телефон
        </div>
        <div *ngFor="let item of services; let i = index">
        <input type="checkbox" id="Id{{i}}"/>{{item.title}} (цена {{item.price}} грн)
        <p>Продолжительность:</p><input id="durance{{i}}" type="number"/>
        <p>Начало:</p><input id="time{{i}}" type="time"/><br>
        </div>
        <button class="btn btn-default" (click)="submit()" style="float:right">OK</button>
        
        </div>
        <div *ngIf="cookieValue==''">
        <ul>
            <li *ngFor="let item of services">{{item.title}} (цена {{item.price}} грн)</li>
        </ul>
        </div>
        </form>
    </div>`,
    styleUrls: ["../assets/styles.css"]
})
export class SalesComponent { 
 
    sales: Sale[] = [];
    category:string;
    services: Service[];
    id: number;
    client: string;
    phone: string;
    cookieValue: string;
    
    constructor(private http: HttpClient,
        private route: ActivatedRoute,
        private cookieService: CookieService) { 
            
    }
     
    ngOnInit()
    {
        this.cookieValue = this.cookieService.get("status");
        this.route.queryParams.subscribe(params => {
            this.category = params['category'];
        });
        this.http.post('http://localhost:3000/getsales', this.category).
            subscribe((data:Sale[]) => this.sales=data);
    }

    getImage(avatar: string)
    {
        return "http://localhost:3000/getsaleimage?avatar=" + avatar;
    }

    getServices(id)
    {
        this.id = id;
        this.http.post('http://localhost:3000/getservices', {"id": id}).
            subscribe((data:Service[]) => this.services=data);
    }

    submit() {
        alert("!");
        var forOrders = [];
        for (var i = 0; i < this.services.length; i++)
        {
            var element = <HTMLInputElement> document.getElementById("Id"+i);
            if (element.checked)
            {
                forOrders.push({
                    "clientid" : this.cookieService.get("user"),
                    "clientname" : this.client,
                    "telephonenumber" : this.phone,
                    "kindofservice": this.services[i].title,
                    "durance" : (<HTMLInputElement>document.getElementById("durance"+i)).value,
                    "datetime" : (<HTMLInputElement>document.getElementById("time"+i)).value
                });
            }
        }
        var forAnswer;
        this.http.post("http://localhost:3000/addorder", {"order" : forOrders}).subscribe((data:any) => forAnswer=data);
    }
}