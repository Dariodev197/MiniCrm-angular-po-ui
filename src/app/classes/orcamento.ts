export class Orcamentos{

    orcamentos: Orcamentos[] = []
    

}

export class Orcamento{

    status: string = ''
    filial: string = ''
    numero: string = ''
    carrinho: string = ''
    cliente: string = ''
    nome: string = ''
    emissao: string = ''
    valor: number = 0
    itens: Array<item> = []   

}

export class item{
    item: string = ''
    produto: string = ''
    descricao: string = ''
    quantidade: number = 0
    preco: number = 0
    valor: number = 0
}