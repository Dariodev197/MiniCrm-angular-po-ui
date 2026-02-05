import { Routes } from '@angular/router';
import { LoginfpageComponent } from './paginas/loginfpage/loginfpage.component';
import { MasterpageComponent } from './paginas/masterpage/masterpage.component';
import { HomeComponent } from './paginas/home/home.component';
import { CatalogpageComponent } from './paginas/catalogpage/catalogpage.component';
import { BugetpageComponent } from './paginas/bugetpage/bugetpage.component';
import { LogofpageComponent } from './paginas/logofpage/logofpage.component';
import { CustomerComponent } from './paginas/customer/customer.component';
import { ErrorpageComponent } from './paginas/errorpage/errorpage.component';

export const routes: Routes = [
    {path: 'login',component: LoginfpageComponent},
    {path: '',component: MasterpageComponent,children:[
             {path: 'home',component: HomeComponent},
             {path: 'customers',component: CustomerComponent},
             {path: 'catalag',component: CatalogpageComponent},
             {path: 'budget',component: BugetpageComponent},
             {path: 'logof',component: LogofpageComponent},

    ]},
             {path: '**', component: ErrorpageComponent}

];
