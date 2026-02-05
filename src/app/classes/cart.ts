import { Product } from "./products";

export class Cart{
    codCliente: string = '';
    lojCliente: string = '';
    nomeCliente: string = '';
    itens: Array<ItemCart> = [];
    valor: number = 0;
}

export class ItemCart{
    id: number = 0;
    ativo: boolean = true;
    item!: Product
}