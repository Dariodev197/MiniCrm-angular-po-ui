import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { PoInfoModule, PoListViewModule, PoModalModule, PoPageModule , PoPageFilter,} from '@po-ui/ng-components';
import { Customer } from '../../classes/customer';
import { CustomerService } from '../../services/customer.service';
import { PoModalComponent } from '@po-ui/ng-components';
import { PoLoadingModule } from '@po-ui/ng-components';


@Component({
  selector: 'app-customer',
  imports: [PoPageModule, PoListViewModule,PoInfoModule,PoModalModule,PoLoadingModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {

  isLoading: boolean = true;
  customerList: Array<Customer> = [];
  customelistFiltred: Array<Customer> = [];
  detailCustomer: Customer = new Customer();
  #customerService = inject(CustomerService);
  filterStettings: PoPageFilter = {placeholder:"Filtrar por nome ou endereço", action: this.customerFilter.bind(this)};

  @ViewChild('modalCustomer') modalCustomerElement!: PoModalComponent

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    let req = this.#customerService.getCustomers();
    let itens: Array<Customer> = [];
    const hideload = () => this.isLoading = false;

    req.subscribe({
      next(value: any) {
        value.items.forEach((element: Customer) => itens.push(element));
        hideload();
      },

      error(err) {
        console.error('Error fetching customer list', err);
      },
      
      complete() {
        console.log('complete customer list');
      }
    });
    this.customerList = itens;
    this.customelistFiltred = itens;
    
    //setTimeout(() => this.isLoading = false, 2000); 

  }
  showDetail(customer: Customer): void{

    this.detailCustomer = customer
    this.modalCustomerElement.open();

  }
  customerFilter(content: string){

    this.customelistFiltred = this.customerList.filter(customer => 
        customer.nome.indexOf(content.toUpperCase())>= 0 || 
        customer.endereco.indexOf(content.toUpperCase()) >= 0)
  }
}
