import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../classes/products';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  #http = inject(HttpClient)
  #url = environment.url

  constructor(){}

  public getProducts(): Observable<Array<Product>> {
   let url: string = `${this.#url}/curso/tabelas/sb1`;
       console.log('URL Chamada:', url);
   
       let headers = new HttpHeaders({
            'Authorization': 'Basic ' + btoa('admin:99'),
            'TenantId':'99,01'
       });

       return this.#http.get<Array<Product>>(url,{headers});
     }
}
