
import { Component, inject, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { 
    PoMenuModule, 
    PoMenuPanelItem,
    PoMenuPanelModule,
    PoPageModule, 
    PoInfoModule, 
    PoPageSlideModule, 
    PoDividerModule, 
    PoInfoOrientation, 
    PoNotificationService, 
    PoModalModule, 
    PoFieldModule,
    PoModalComponent} from '@po-ui/ng-components';
import { PoPageAction } from '@po-ui/ng-components';
import { PoPageSlideComponent } from '@po-ui/ng-components';
import { PoButtonModule } from '@po-ui/ng-components';
import { CartService }  from '../../services/cart.service';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { Cart, ItemCart } from '../../classes/cart';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-masterpage',
  standalone: true,
  imports: [
            PoMenuModule, 
            PoMenuPanelModule, 
            PoPageModule,
            RouterModule, 
            PoInfoModule,
            PoPageSlideModule,
            PoButtonModule, 
            PoDividerModule, 
            PoModalModule,
            PoFieldModule],
  templateUrl: './masterpage.component.html',
  styleUrl: './masterpage.component.css'
})
export class MasterpageComponent implements OnDestroy{
    public title: string = 'home'
    #CartService = inject(CartService)
    #notyfy = inject(PoNotificationService)
    valueCart$ = this.#CartService.getcartValue();
    valueCart: number = 0;
    cart$ = this.#CartService.getCart();
    cart: Cart = new Cart()
    sub = new Subscription()
    orientation : PoInfoOrientation = PoInfoOrientation.Horizontal
    urlfiltercustomer: string = `${environment.url}/curso/tabelas/sa1`;
    

    @ViewChild('modalCustomer') modalCustomerEl !: PoModalComponent;
    
    constructor(){
        const subValue = this.valueCart$.subscribe(vlr => this.valueCart = vlr);
        const subCart = this.cart$.subscribe(cart => this.cart = cart);
        this.sub.add(subValue);
        this.sub.add(subCart);

    }

    ngOnDestroy(): void{
        this.sub.unsubscribe();
    }

    readonly menus: Array<PoMenuPanelItem> = [
         { label: 'Home', link: 'home', action: this.clickItemMenu.bind(this), icon: 'po-icon po-icon-home' },
         { label: 'Customers', link: 'customers', action: this.clickItemMenu.bind(this), icon: 'po-icon po-icon-users' },
         { label: 'Products', link: 'catalag', action: this.clickItemMenu.bind(this), icon: 'po-icon po-icon-grid' },
         { label: 'Budgets', link: 'budget', action: this.clickItemMenu.bind(this), icon: 'po-icon po-icon-pushcart' },
         { label: 'Exit', link: 'logof', action: this.clickItemMenu.bind(this), icon: 'po-icon po-icon-exit' },
    ]
    readonly actions: Array<PoPageAction> = [
        {label:'Cart', action:this.clickOpenCart.bind(this), icon:'po-icon po-icon-cart'},
        {label: 'Select Customer', action: () => this.modalCustomerEl.open(), icon:'po-icon po-icon-user'},
    ]
    
    @ViewChild('slideCart') slideCart !: PoPageSlideComponent;
   
    clickItemMenu(menu: PoMenuPanelItem): void {
        this.title = menu.label as string;

    }
    clickOpenCart():void{
        this.slideCart.open();

    }
    clickDelItemCart(item: ItemCart):void{
        item.ativo = false;
        if(this.#CartService.updateCart()) {
            this.#notyfy.setDefaultDuration(1000);
            this.#notyfy.success('Item removido do carrinho com sucesso!');
        }else{
            this.#notyfy.setDefaultDuration(1000);
            this.#notyfy.error('Erro ao remover item do carrinho!');
        }

    }
   
        clickConfirmCart():void{

    }

}


