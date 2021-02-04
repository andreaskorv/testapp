import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MainModule } from './main/main.module';
import { RegisterModule } from './main/register.module';
import { DashboardModule } from './main/dashboard.module';
import { OrdersModule } from './main/orders.module';
import { SalesModule } from './main/sales.module';
import { AddclientModule } from './main/addclient.module';
import { LoginModule} from './main/login.module';
const platform = platformBrowserDynamic();
platform.bootstrapModule(MainModule);
/*platform.bootstrapModule(RegisterModule);
platform.bootstrapModule(DashboardModule);
platform.bootstrapModule(OrdersModule);
platform.bootstrapModule(SalesModule);*/