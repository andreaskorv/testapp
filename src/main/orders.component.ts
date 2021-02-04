import { Component } from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Order } from './dashboard.component';
     
export class Service{
    constructor(public title: string, 
                public price: number, 
                public durance: number)
    { }
}
 
@Component({
    selector: 'orders',
    template: `<h3>Просмотр заказов клиента</h3>
    <table>
        <tr>
            <th>Дата заказа</th>
            <th>Тип услуги</th>
            <th>Продолжительность</th>
            <th>Провайдер</th>
        </tr>
        <tr *ngFor="let item of orders">
            <td>{{item.datetime}}</td>
            <td>{{item.kindofservice}}</td>
            <td>{{item.durance}}</td>
            <td>{{item.provider}}</td>
            <td><button type="button" class="close" (click)="remove(item.id)">×</button></td>
        </tr>
    </table>`,
    styleUrls: ["../assets/styles.css"]
})
export class OrdersComponent { 
 
    orders: Order[] = [];
  cookieValue: any;
    
    
    constructor(private http: HttpClient,
      private route: ActivatedRoute,
      private router: Router,
      private cookieService: CookieService){}
     
    ngOnInit()
    {
      this.cookieValue = this.cookieService.get("status");
      if (this.cookieValue !== "client")
      {
          this.router.navigate(["/"], {});
      }
      else
      {
          var body = {provider : this.cookieService.get("user")};
          this.http.post('http://localhost:3000/getorders', body).subscribe((data:Order[]) => this.orders=data);
      }
    }
}