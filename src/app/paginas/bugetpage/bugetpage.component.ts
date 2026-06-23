import { Component, inject } from '@angular/core';
import { PoBreadcrumbItem, PoBreadcrumbModule, PoDividerModule, PoInfoModule, PoPageModule, PoTableColumn, PoTableModule } from '@po-ui/ng-components';
import { Orcamentos } from '../../classes/orcamento';
import { BudgetService } from '../../services/budget.service';

@Component({
    selector: 'app-bugetpage',
    imports: [PoPageModule, PoTableModule, PoInfoModule, PoDividerModule, PoBreadcrumbModule],
    templateUrl: './bugetpage.component.html',
    styleUrl: './bugetpage.component.css'
})
export class BugetpageComponent {

    public tableColums: PoTableColumn[] = [
        {
            property: 'status', type: 'subtitle', subtitles: [
                { value: 'A', label: 'Aberto', color: 'color-11', content: 'A' },
                { value: 'B', label: 'Aprovado', color: 'color-08', content: 'B' },
                { value: 'C', label: 'Cancelado', color: 'color-04', content: 'C' }
            ]
        },
        { property: 'numero', label: 'Orcamento' },
        { property: 'valor', label: 'Valor', type: 'currency', format: 'BRL' },
        { property: 'nome', label: 'Cliente', },
        { property: 'filial', label: 'Filial', visible: false },
        { property: 'carrinho', label: 'Carrinho', visible: false },
        { property: 'emissao', label: 'Emissão', visible: false },
    ]

    public orcamentos: Orcamentos[] = []
    private orcamentoService = inject(BudgetService)
    public breadcrumbStr: PoBreadcrumbItem[] = [
        { label: 'Home', link: '/home' },
        { label: 'Orçamentos' }
    ];

    constructor() {
        this.loadOrcamentos();
    }

    private loadOrcamentos() {

        this.orcamentoService.getOrcamentos().subscribe({
            next: (value) => this.orcamentos = value.orcamentos,
            error: (err) => console.log('Erro ao carregar lista de orcamento', err),
            complete: () => { }

        })
    }
}