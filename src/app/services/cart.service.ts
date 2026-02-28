import { inject, Injectable, OnDestroy } from '@angular/core';
import { Cart, RespConfirmaOrcamento } from '../classes/cart';
import { Product } from '../classes/products';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { CustomerService } from './customer.service';
import { Customer } from '../classes/customer';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PoDialogService, PoNotificationService } from '@po-ui/ng-components';

@Injectable({ providedIn: 'root' })

export class CartService implements OnDestroy {

    private cart: Cart = new Cart;
    private value$ = new BehaviorSubject<number>(0);
    private cart$ = new Subject<Cart>();
    private customerService = inject(CustomerService)
    private customerSelected$ = this.customerService.getCustomerSelected()
    private customerSelected: Customer = new Customer()
    private hiddenLoading$ = new BehaviorSubject<boolean>(true);
    private sub = new Subscription()
    private http = inject(HttpClient)
    private url = environment.url
    private dialog = inject(PoDialogService)
    private notify = inject(PoNotificationService)

    constructor() {
        const subCustomer = this.customerSelected$.subscribe(customer => this.customerSelected = customer);
        this.sub.add(subCustomer);
    }
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    sendCartERP(): boolean {

        this.cart.codCliente = this.customerSelected.codigo
        this.cart.lojCliente = this.customerSelected.loja
        this.cart.nomeCliente = this.customerSelected.nome

        console.log('sendCartERP', this.cart);
        let isSencCart: boolean = true;
        this.http.post<Cart>(`${this.url}/curso/api/cart`, this.cart).subscribe({
            next: (value) => { isSencCart = true; this.cart.codigo = value.codigo },
            error: (err) => console.log('Erro ao enviar o carrinho', err),
            complete: () => { }
        })
        return isSencCart
    }
    getCartERP(): void {

        let codCliente = this.customerSelected.codigo
        let lojaCliente = this.customerSelected.loja
        console.log('getCartERP', codCliente, lojaCliente);
        this.http.get<Cart>(`${this.url}/curso/api/cart/itens/${codCliente}/${lojaCliente}`)
            .subscribe({
                next: (value) => {

                    this.cart = value;
                    this.cart.valor = 0
                    this.cart.itens.forEach((el) => el.ativo ? this.cart.valor += (el.item.quantidade * el.item.preco) : null)

                    /*
                    this.cart = value 
                    this.cart.codCliente = value.codCliente
                    this.cart.lojCliente = value.lojCliente
                    this.cart.nomeCliente = value.nomeCliente
                    this.cart.itens = value.itens
                    this.cart.valor = value.valor*/

                    this.cart$.next(this.cart);
                    this.value$.next(this.cart.valor);
                },
                error: (err) => console.log('Erro ao buscar o carrinho', err),
                complete: () => { }
            })
    }

    confirmeCartErp(): boolean {

        this.hiddenLoading$.next(false);
        let isConfirmaCart: boolean = false;
        let codCliente = this.customerSelected.codigo
        let lojaCliente = this.customerSelected.loja
        let codigoCart: string = this.cart.codigo

        if (!codigoCart) {
            this.notify.warning({ duration: 2000, message: 'Carrinho Vazio' })
            return false;
        }

        this.http.get<RespConfirmaOrcamento>(`${this.url}/curso/api/cart/confirm/${codCliente}/${lojaCliente}/${codigoCart}`)
            .subscribe({
                next: (value) => {
                    isConfirmaCart = true,
                        this.dialog.alert({ title: 'Compra Confirmada', message: `Orçamento ${value.codigo} confirmado com Sucesso!` })
                    this.cart = new Cart();
                    this.cart$.next(this.cart);
                    this.value$.next(0);
                },
                error: (err) => { console.log(`erro`, err) },
                complete: () => {this.hiddenLoading$.next(true); }
            })
        return isConfirmaCart;
    }

    getHiddenLoading() {
        return this.hiddenLoading$.asObservable();
    }

    getcartValue() {
        return this.value$.asObservable();
    }
    getCart() {
        return this.cart$.asObservable();
    }

    addItem(item: Product): boolean {


        console.log('item', item)
        if (typeof item.quantidade !== 'number') {
            item['quantidade'] = 1
        }
        item.quantidade === 0 ? item.quantidade = 1 : null
        item.preco === 0 ? item.preco = 1 : null
        this.cart.itens.push({
            id: this.cart.itens.length + 1,
            ativo: true,
            item: item
        })

        let valor: number = 0;
        this.cart.itens.forEach((li) => {
            if (li.ativo) {
                valor += (li.item.preco * li.item.quantidade)
            }
        })
        this.value$.next(valor)
        this.cart$.next(this.cart)

        return true;
    }

    updateCart(): boolean {
        let valor: number = 0;
        this.cart.itens.forEach((li) => valor += li.ativo ? (li.item.preco * li.item.quantidade) : 0)
        this.value$.next(valor);

        return true;
    }
}