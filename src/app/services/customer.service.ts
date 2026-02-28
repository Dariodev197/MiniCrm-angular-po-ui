import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Customer } from '../classes/customer';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  #http = inject(HttpClient);
  #url = environment.url;
  #customerList$ = new Subject<Array<Customer>>();
  #customerSelected$ = new BehaviorSubject<Customer>(new Customer());

  constructor() {}

  public getCustomers(): Observable<Array<Customer>> {
    

    let url: string = `${this.#url}/curso/tabelas/sa1`;
    console.log('URL Chamada:', url);

    let headers = new HttpHeaders({
         'Authorization': 'Basic ' + btoa('admin:99'),
         'TenantId':'99,01'

         
    });

    return this.#http.get<Array<Customer>>(url,{headers});

  }

  public setCustomerList(listcustomers: Customer[]): void {
    this.#customerList$.next(listcustomers);

  }
  public getCustomerList() {
      return this.#customerList$.asObservable();
  }
  public setCustomerSelected(customer: Customer) {
        this.#customerSelected$.next(customer);

  }
  public getCustomerSelected() {
        return this.#customerSelected$.asObservable();
  }
}
