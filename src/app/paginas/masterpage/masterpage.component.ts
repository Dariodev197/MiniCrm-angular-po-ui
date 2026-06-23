
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
    PoModalComponent,
    PoComboComponent,
    PoNotification,
    PoDialogService,
    PoLoadingModule,
    PoMenuItem,
    PoToolbarModule
} from '@po-ui/ng-components';
import { PoPageAction } from '@po-ui/ng-components';
import { PoPageSlideComponent } from '@po-ui/ng-components';
import { PoButtonModule } from '@po-ui/ng-components';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { Cart, ItemCart } from '../../classes/cart';
import { environment } from '../../../environments/environment';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../classes/customer';
import { Profile } from '../../classes/profile';
import { ProfileService } from '../../services/profile.service';
import { NgClass } from "../../../../node_modules/@angular/common/index";

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
    PoFieldModule,
    PoLoadingModule,
    PoToolbarModule,
],
    templateUrl: './masterpage.component.html',
    styleUrl: './masterpage.component.css'
})
export class MasterpageComponent implements OnDestroy {
    public title: string = 'home'
    #CartService = inject(CartService)
    #notify = inject(PoNotificationService)
    #customerService = inject(CustomerService)
    valueCart$ = this.#CartService.getcartValue();
    #dialog = inject(PoDialogService)
    valueCart: number = 0;
    cart$ = this.#CartService.getCart();
    cart: Cart = new Cart()
    listcustomer$ = this.#customerService.getCustomerList();
    listcustomer: any
    customerSelected$ = this.#customerService.getCustomerSelected();
    customerSelected: Customer = new Customer();
    sub = new Subscription()
    orientation: PoInfoOrientation = PoInfoOrientation.Horizontal
    hiddenOverlayCart$ = this.#CartService.getHiddenLoading();
    hiddenOverlayCart: boolean = true;
    urlfiltercustomer: string = `${environment.url}/curso/tabelas/sa1`;
    profile: Profile = new Profile();
    profileService = inject(ProfileService);
    profile$ = this.profileService.getProfile();

    @ViewChild('slideCart') slideCart !: PoPageSlideComponent;
    @ViewChild('comboCustomer') comboCustomerEl !: PoComboComponent
    @ViewChild('modalCustomer') modalCustomerEl !: PoModalComponent;

    constructor() {

        this.profile.name = 'Vendedor Padrão'
        this.profile.coduser = '000000'

        const username = localStorage.getItem('username') ?? '';
        this.profileService.loadProfile(username);


        const subValue = this.valueCart$.subscribe(vlr => this.valueCart = vlr);
        const subCart = this.cart$.subscribe(cart => this.cart = cart);
        const subList = this.listcustomer$.subscribe(list => this.listcustomer = list);
        const subCustomer = this.customerSelected$.subscribe(cust => this.customerSelected = cust);
        const subHidden = this.hiddenOverlayCart$.subscribe(hidden => this.hiddenOverlayCart = hidden);
        const subProfile = this.profile$.subscribe(value => this.profile = value);
        this.sub.add(subValue);
        this.sub.add(subCart);
        this.sub.add(subList);
        this.sub.add(subCustomer);
        this.sub.add(subHidden);
        this.sub.add(subProfile);
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    readonly menus: Array<PoMenuItem> = [
        { label: 'Home', shortLabel: 'Home', link: 'home', action: this.clickItemMenu.bind(this), icon: 'po-icon po-icon-home' },
        { label: 'Prospects', shortLabel: 'Prospects', link: 'Prospects', action: this.clickItemMenu.bind(this), icon: "an an-users-three" },
        { label: 'Customers', shortLabel: 'Customers', link: 'customers', action: this.clickItemMenu.bind(this), icon: 'po-icon po-icon-users' },
        { label: 'Products', shortLabel: 'Products', link: 'catalag', action: this.clickItemMenu.bind(this), icon: 'po-icon po-icon-grid' },
        { label: 'Budgets', shortLabel: 'Budgets', link: 'budget', action: this.clickItemMenu.bind(this), icon: 'po-icon po-icon-pushcart' },
        { label: 'Exit', shortLabel: 'Exit', action: this.clickItemLogoff.bind(this), icon: 'po-icon po-icon-exit' },
    ]
    readonly actions: Array<PoPageAction> = [
        { label: 'Cart', action: this.clickOpenCart.bind(this), icon: 'po-icon po-icon-cart' },
        { label: 'Select Customer', action: () => this.modalCustomerEl.open(), icon: 'po-icon po-icon-user' },
    ]



    clickItemMenu(menu: PoMenuPanelItem): void {
        this.title = menu.label as string;

    }
    clickItemLogoff(){
        this.#dialog.confirm({
            title: 'Confima Logooff',
            message: 'Confirma o logoff da aplicação',
            confirm: () => {
                localStorage.clear();
                location.reload();

            },
            cancel: () => {}
        })

    }

    clickOpenCart(): void {
        this.slideCart.open();

    }
    clickDelItemCart(item: ItemCart): void {
        item.ativo = false;
        if (this.#CartService.updateCart()) {
            let isSenCart: boolean = this.#CartService.sendCartERP();
            this.#notify.setDefaultDuration(1000);
            this.#notify.success('Item removido do carrinho com sucesso!');
        } else {
            this.#notify.setDefaultDuration(1000);
            this.#notify.error('Erro ao remover item do carrinho!');
        }

    }
    confirmaModal(): void {
        let codigo: string = this.comboCustomerEl.selectedValue;
        let nome: string = '';
        let customerSelected: Customer = new Customer;
        let notify: PoNotification = {
            message: 'nenhum cliente selecionado',
            duration: 1500,
            
        }

        console.log('combo', codigo, nome);

        if (codigo) {
            nome = this.comboCustomerEl.selectedOption.label;
            this.listcustomer.forEach((customer: Customer) => {
                if (customer.codigo === codigo && customer.nome === nome) {
                    customerSelected = customer;
                    notify.message = `Novo Cliente Selecionado: ${customer.nome}`;

                }
            })
        }
        this.#customerService.setCustomerSelected(customerSelected);
        this.#notify.information(notify)
        this.#CartService.getCartERP();
        this.modalCustomerEl.close();

    }


    clickConfirmCart(): void {
        let isConfirmaCart: boolean = false;
        this.#dialog.confirm({
            title: 'Confirmar Compra',
            message: 'Deseja confirmar a compra?',
            confirm:() => {isConfirmaCart = this.#CartService.confirmeCartErp()},
            cancel:() => {console.log('Cliclou em cancelar')}
        })
    }

}


