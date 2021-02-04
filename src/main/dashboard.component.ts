import { Component } from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
     
export class Order{
    constructor(public id: number,
                public datetime: Date, 
                public clientname: string,
                public clientid: number,
                public telephonenumber: string,
                public kindofservice: string,
                public durance: number,
                public provider: any)
    { }
}
 
@Component({
    selector: 'dashboard',
    template: `<h3>Просмотр заказов провайдера</h3>
    <table>
        <tr>
            <th>Дата заказа</th>
            <th>Имя клиента</th>
            <th>Телефонный номер</th>
        </tr>
        <tr *ngFor="let item of orders">
            <td>{{item.datetime}}</td>
            <td>{{item.clientname}}</td>
            <td>{{item.telephonenumber}}</td>
            <td><button type="button" class="close" (click)="remove(item.id)">×</button></td>
        </tr>
    </table>`,
    styleUrls: ["../assets/styles.css"]
})
export class DashboardComponent { 
 
    orders: Order[] = [];
    cookieValue: string;
    
    
    constructor(private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private cookieService: CookieService){}
     
    ngOnInit()
    {
        this.cookieValue = this.cookieService.get("status");
        if (this.cookieValue !== "provider")
        {
            this.router.navigate(["/"], {});
        }
        else
        {
            var body = {provider : this.cookieService.get("user")};
            this.http.post('http://localhost:3000/getorders', body).subscribe((data:Order[]) => this.orders=data);
        }
    }

    remove(id)
    {
        alert(id);
        this.http.post('http://localhost:3000/removeorder', {"id": id}).subscribe((data:Order[]) => this.orders=data);
    }
}