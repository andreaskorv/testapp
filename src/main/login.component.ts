import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService }    from 'ngx-cookie-service';
import { sha256 } from 'js-sha256';

export class User{
    id: number;
    status: string;
}
 
@Component({
    selector: 'login',
    template: `<form class="frm">
    <p>Ваше имя:</p>
    <input type="text" name="_login" [(ngModel)]="flogin" #_login="ngModel" required>
    <div [hidden]="_login.valid || _login.untouched" class="alert alert-danger">
        Не указано имя
    </div>
    <p>Ваш телефон:</p>
    <input type="password" name="_password" [(ngModel)]="fpassword" #_password="ngModel" required>
    <div [hidden]="_password.valid || _password.untouched" class="alert alert-danger">
        Не указан телефон
    </div>
            <br><button data-dismiss="modal" (click)="login()">OK</button>
        </form>`,
    styleUrls: ["../assets/styles.css"]
})
export class LoginComponent implements OnInit { 
    flogin: string;
    fpassword: string;
    key: string;
    user: User;
    
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        private cookieService: CookieService
        ){
            //this.http.post("http://localhost:3000/login_key", []).subscribe((res:string) => this.key=res);
        }
     
    ngOnInit()
    {
        this.http.post("http://localhost:3000/login_key", []).subscribe((res:string) => this.key=res);
    }

    login()
    {
        this.http.post("http://localhost:3000/login_key", []).subscribe((res:string) => this.key=res);
        alert(this.key);
    }
    
}