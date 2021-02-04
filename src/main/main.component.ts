import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
 
@Component({
    selector: 'main',
    template: `<head></head>
    <router-outlet></router-outlet>`
})
export class MainComponent{ 

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        private cookieService: CookieService
        ){

        }
 
    switch(address: string)
    {
        this.router.navigate([address], {});
    }
}