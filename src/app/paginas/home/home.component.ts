import { Component } from '@angular/core';
import { PoChartModule, PoChartType, PoPageModule, PoWidgetModule } from '@po-ui/ng-components';
import { OnDestroy } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [PoWidgetModule, PoChartModule, PoPageModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy{

    private dashboardService = inject(DashboardService);
    private orcamentos$ = this.dashboardService.getOrcamentos();
    private pedidos$ = this.dashboardService.getPedidos();
    private sub = new Subscription();
    private router = inject(Router); 

    public orcamentos : any
    public pedidos : any
    public chartBarras = PoChartType.Bar
    public chartPizza = PoChartType.Pie


    constructor() {
        this.dashboardService.loaddata();
        const subOrcamentos = this.orcamentos$.subscribe({
            next: value =>{
                this.orcamentos = value.series;
            }
        });

        const subPedidos = this.pedidos$.subscribe({
            next: value =>{
                this.pedidos = value.series;
            }
        });

        this.sub.add(subOrcamentos);
        this.sub.add(subPedidos);
     }   

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    public viewDetail(){
        console.log('Ver Detalhes');
        this.router.navigate(['budget']);

    }
}
