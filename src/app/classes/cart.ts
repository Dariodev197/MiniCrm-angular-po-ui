import { Product } from "./products";

export class Cart{
    codCliente: string = '';
    lojCliente: string = '';
    nomeCliente: string = '';
    itens: Array<ItemCart> = [];
    valor: number = 0;
    codigo: string = '';
}

export class ItemCart{
    id: number = 0;
    ativo: boolean = true;
    item!: Product

}

export class RespConfirmaOrcamento{
    codigo: string = '';
    status: string = '';
    message: string = '';
}