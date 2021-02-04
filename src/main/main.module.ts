import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule }   from '@angular/common/http';
import { MainComponent }   from './main.component';
import { Routes, RouterModule } from '@angular/router';
import { SalesComponent } from './sales.component';
import { RegisterComponent } from './register.component';
import { HomeComponent} from './home.component';
import { HomeModule } from './home.module';
import { OrdersComponent } from './orders.component';
import { DashboardComponent } from './dashboard.component';
import { AddclientComponent } from './addclient.component';
import { LoginComponent } from './login.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'sales', component: SalesComponent},
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent},
    { path: 'orders', component: OrdersComponent },
    { path: 'addclient', component: AddclientComponent},
    { path: 'login', component: LoginComponent }
];

@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpClientModule, RouterModule, RouterModule.forRoot(appRoutes) ],
    declarations: [ MainComponent ],
    bootstrap:    [ MainComponent ]
})
export class MainModule { }