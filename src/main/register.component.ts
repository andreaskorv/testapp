import { Component, OnInit } from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CookieService }    from 'ngx-cookie-service';
import { Time } from '@angular/common';
import { Category } from './home.component';
     
export class Service{
    constructor(public title: string, 
                public price: number, 
                public durance: number)
    { }
}

export class Provider{
    private static keys = ['organization', 'address', 'phone', 'email', 'category', 'from', 'to', 'password', 'services'];

    public organization: string;
                public address: string;
                public phone: string;
                public email: string;
                public category: string;
                public from: Time;
                public to: Time;
                public password: string;
                public services: Service[]

                toJsonString(): string {
                    const data = {};
                    Provider.keys.forEach(key => data[key] = this[key]);
                    return JSON.stringify(data);
                }
}
 
@Component({
    selector: 'register',
    template: `<h3>Зарегистрироваться как провайдер</h3>
    <form enctype="multipart/form-data">
    <div class="frm">
        <div class="row">
            <div class="col-xs-6">
                <p>Название организации:</p>
                <input type="text" name="organization" [(ngModel)]="provider.organization" #organization="ngModel" required><div [hidden]="organization.valid || organization.untouched" class="alert alert-danger">
                Не указано название
              </div>
                <p>Адрес:</p>
                <input type="text" name="address" [(ngModel)]="provider.address" #address="ngModel" required><div [hidden]="address.valid || address.untouched" class="alert alert-danger">
                Не указан адрес
              </div>
                <p>Телефон:</p>
                <input type="text" name="phone" [(ngModel)]="provider.phone" #phone="ngModel" required><div [hidden]="phone.valid || phone.untouched" class="alert alert-danger">
                Не указан телефон
              </div>
                <p>E-mail (будет использоваться в качестве логина):</p>
                <input type="text" name="email" [(ngModel)]="provider.email" #email="ngModel" required pattern="[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}" ><div [hidden]="email.valid || email.untouched" class="alert alert-danger">
                Не указан e-mail
              </div>
                <p>Время работы:</p>
                С <input type="time" name="from" [(ngModel)]="provider.from"> по <input type="time" name="to" [(ngModel)]="provider.to">
                <p>Пароль:</p>
                <input type="password" name="password" [(ngModel)]="provider.password" #password="ngModel" required><div [hidden]="password.valid || password.untouched" class="alert alert-danger">
                Не указан пароль
              </div>
              <p>Логотип:</p>
              <input
              style="display: none"
              #fileInput
              type="file" (change)="onFileSelected($event)" >
          <button type="button" (click)="fileInput.click()">Загрузить логотип</button>

                  <p>Тип услуг:</p>
                  <p>
                  <select name="category" [(ngModel)]="provider.category" #category="ngModel" required>
                        <option *ngFor="let category of categories" value="{{category.category}}">{{category.category}}</option>
                    </select> 
                    <div [hidden]="category.valid || category.untouched" class="alert alert-danger">
                    Не указана категория
                  </div>
            </div>
            <div class="col-xs-6">
                <p>Услуги: <button type="button" class="btn-lg" data-toggle="modal" data-target="#addservice">+</button></p>
                <table>
                    <ul *ngFor="let s of provider.services; let i = index;">
                        <li (click)="changeService(i)" data-toggle="modal" data-target="#addservice"><a>{{s.title}} (цена: {{s.price}}, длительность {{s.durance}} грн)</a></li>
                    </ul>
                </table>
            </div>
        </div>
        <button [disabled]="organization.invalid || address.invalid || password.invalid || email.invalid || phone.invalid" class="btn btn-default" (click)="addProvider()" style="float:right">OK</button>
    </div>
    </form>
    <div id="addservice" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="form-group">
            <label>Название</label>
            <input class="form-control" name="title" [(ngModel)]="service.title" />
        </div>
        <div class="form-group">
            <label>Цена</label>
            <input type="number" class="form-control" name="price" [(ngModel)]="service.price" />
        </div>
        <div class="form-group">
            <label>Длительность (в минутах)</label>
            <input class="form-control" name="durance" [(ngModel)]="service.durance" />
        </div>
        <button class="btn btn-default" (click)="addService()" data-dismiss="modal">Добавить</button>
    </div>`,
    styleUrls: ["../assets/styles.css"]
})
export class RegisterComponent implements OnInit {
 
    service: Service = {title: "", price: 0, durance: 0};
    categories: Category[];
    provider: Provider = new Provider();
    selectedFile: File = null;
    changedService: number;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        private cookieService: CookieService
        ){
            this.provider.services = [];
            this.changedService = -1;
        }
    
    addProvider(){
        const fd = new FormData();
        fd.append('avatar', this.selectedFile, 'avatar');
        fd.append('data', this.provider.toJsonString());
        let forAnswer = {answer: ''};
        this.http.post('http://localhost:3000/addprovider', fd).
            subscribe((data:string) => forAnswer.answer=data);
        //this.onUpload();
        this.cookieService.set("user", forAnswer.answer);
        this.cookieService.set("status", "provider");
        this.router.navigate(['/'], {});
    }

    addService(){
        if (this.changedService == -1)
        {
            this.provider.services.push(new Service(this.service.title, this.service.price, this.service.durance));
        }
        else
        {
            this.provider.services[this.changedService] = new Service(this.service.title, this.service.price, this.service.durance);
            this.changedService = -1;
        }
    }

    switch(address: string)
    {
        this.router.navigate([address], {});
    }

    ngOnInit()
    {
        this.http.post('http://localhost:3000/getcategories', []).subscribe((data:Category[]) => this.categories=data);
        let forCheck = this.cookieService.get("status");
        if (forCheck !== "")
        {
            this.router.navigate(['/'], {});
        }
    }

    onFileSelected(event) {
        this.selectedFile = <File>event.target.files[0];
    }

    onUpload() {
        const fd = new FormData();
        // https://developer.mozilla.org/ru/docs/Web/API/FormData/append
        fd.append('image', this.selectedFile, this.selectedFile.name);
        this.http.post('http://localhost:3000/upload', fd)
        .subscribe(res => {
            console.log('res: ', res);
        });
    }

    changeService(id)
    {
        this.changedService = id;
    }
}