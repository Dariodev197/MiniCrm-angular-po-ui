import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Customer } from '../classes/customer';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  #http = inject(HttpClient);
  #url = environment.url;

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
}
