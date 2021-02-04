import { Component, OnInit } from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CookieService }    from 'ngx-cookie-service';
import { Category } from './home.component';
     
export class Client{
    public name: string;
    public surname: string;
    public year: number;
    public phone: number;
    public email: string;
    public login: string;
    public password: string;


    constructor()
    { }
}
 
@Component({
    selector: 'addclient',
    template: `<h3>Зарегистрироваться как клиент</h3>
    <form>
    <div class="frm">
                <p>Имя:</p>
                <input type="text" name="cname" [(ngModel)]="client.name" #cname="ngModel" required><div [hidden]="cname.valid || cname.untouched" class="alert alert-danger">
                Не указано имя
                </div>
                <p>Фамилия:</p>
                <input type="text" name="csurname" [(ngModel)]="client.surname" #csurname="ngModel" required><div [hidden]="csurname.valid || csurname.untouched" class="alert alert-danger">
                Не указана фамилия
                </div>
                <p>Год рождения:</p>
                <input type="text" name="cyear" [(ngModel)]="client.year" #cyear="ngModel" required><div [hidden]="cyear.valid || cyear.untouched" class="alert alert-danger">
                Не указана фамилия
                </div>
                <p>Телефон:</p>
                <input type="text" name="phone" [(ngModel)]="client.phone" #phone="ngModel" required><div [hidden]="phone.valid || phone.untouched" class="alert alert-danger">
                Не указан телефон
              </div>
                <p>E-mail (будет использоваться в качестве логина):</p>
                <input type="text" name="email" [(ngModel)]="client.email" #email="ngModel" required pattern="[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}" ><div [hidden]="email.valid || email.untouched" class="alert alert-danger">
                Не указан e-mail
              </div>
              <p>Логин:</p>
              <input type="text" name="login" [(ngModel)]="client.login" #login="ngModel" required><div [hidden]="login.valid || login.untouched" class="alert alert-danger">
              Не указан логин
            </div>
                <p>Пароль:</p>
                <input type="password" name="password" [(ngModel)]="client.password" #password="ngModel" required><div [hidden]="password.valid || password.untouched" class="alert alert-danger">
                Не указан пароль
              </div>
              
        <button [disabled]="cname.invalid || csurname.invalid || cyear.invalid || phone.invalid || email.invalid || login.invalid || password.invalid" class="btn btn-default" (click)="addClient()" style="float:right">OK</button>
    </div>
    </form>
    `,
    styleUrls: ["../assets/styles.css"]
})
export class AddclientComponent implements OnInit {
 
    client: Client = new Client();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        private cookieService: CookieService
        ){
            
        }
    
        addClient(){
        let forAnswer = {answer: ''};
        this.http.post('http://localhost:3000/addclient', this.client).
            subscribe((data:string) => forAnswer.answer=data);
        //this.onUpload();
        this.cookieService.set("user", forAnswer.answer);
        this.cookieService.set("status", "client");
        this.router.navigate(['/'], {});
    }

    

    switch(address: string)
    {
        this.router.navigate([address], {});
    }

    ngOnInit()
    {
        let forCheck = this.cookieService.get("status");
        if (forCheck !== "")
        {
            this.router.navigate(['/'], {});
        }
    }
}