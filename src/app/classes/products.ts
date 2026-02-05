export class Product {
    codigo: string;
    nome: string;
    categoria: string;
    um: string;
    preco: number;
    quantidade: number;
    status: string;

    constructor(){
        this.codigo = ' ';
        this.nome = ' ';
        this.categoria = ' ';
        this.um = ' ';
        this.preco = 0;
        this.quantidade = 0;
        this.status = 'ATIVO';
    }
}