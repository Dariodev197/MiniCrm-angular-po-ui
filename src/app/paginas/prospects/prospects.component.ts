import { Component, ViewChild } from '@angular/core';
import { PoPageDynamicTableActions, PoPageDynamicTableCustomAction, PoPageDynamicTableField, PoPageDynamicTableModule } from '@po-ui/ng-templates';
import { environment } from '../../../environments/environment';
import { PoDynamicModule, PoDynamicViewField, PoModalComponent, PoModalModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-prospects',
  imports: [PoPageDynamicTableModule,PoModalModule,PoDynamicModule],
  templateUrl: './prospects.component.html',
  styleUrls: ['./prospects.component.css']
})
export class ProspectsComponent {
    
    public fields: PoPageDynamicTableField[] = [
        { property: 'codigo', label: 'Código' ,filter: true ,key: true},
        { property: 'loja', label: 'Loja' ,key: true , visible: false,allowColumnsManager: true},
        { property: 'nome', label: 'Nome' ,filter: true},
        { property: 'tipopessoa', label: 'Tipo Pessoa' ,filter: true,type: 'label', labels: [
            { value: ' ' , label: 'Vazio'  ,  color:  '#000080'   , textColor: '#F0F8FF',icon: 'ph ph-user' },
            { value: 'F',  label: 'Física'  ,  color: '#000080'   , textColor: '#F0F8FF',icon: 'ph ph-user' },  
            { value: 'J' , label: 'Jurídica',  color: '#4B0082'   , textColor: '#F0F8FF',icon: 'ph ph-building'},
            { value: 'X' , label: 'Outros'  ,  color: '#8B008B'   , textColor: '#F0F8FF'}
        ] },

          { property: 'cgc', label: 'CNPJ/CPF' ,filter: true},
          { property: 'email', label: 'E-mail' ,filter: true},
          { property: 'ddd', label: 'DDD' ,filter: true},
          { property: 'telefone', label: 'Telefone' ,filter: true},
          { property: 'status', label: 'Status' ,filter: true,type: 'label', labels: [
            { value: ' ' , label: 'Ativo'  ,  color: '#006400'   , textColor: '#F0F8FF',icon: 'ph ph-check-square' },
            { value: '2',  label: 'Ativo'  ,  color: '#006400'   , textColor: '#F0F8FF',icon: 'ph ph-check-square' },  
            { value: '1' , label: 'Inativo',  color: '#8B0000'   , textColor: '#F0F8FF',icon: 'ph ph-x-square'},
            
        ] },
          
           
    ];

    public url: string = `${environment.url}/curso/api/prospects`;
    public actions : PoPageDynamicTableActions = {new: '/prospects/new', remove: true,removeAll: true};
    public tableActions: PoPageDynamicTableCustomAction [] = [
        { label: 'Detalhes', action: this.openDetailProspect.bind(this),icon: 'ph ph-user'},
        { label: 'Visualizar', action: '/prospects/view', icon: 'ph ph-eye'}    
    ]

    public nomeprospect: string = '';

    @ViewChild('ProspectDetailModal') ProspectModal!: PoModalComponent;

    public prospectField: PoDynamicViewField[] = [
        { property: 'codigo', label: 'Código', gridColumns: 2 },
        { property: 'loja', label: 'Loja' },
        { property: 'cgc', label: 'CNPJ/CPF' },
        { property: 'email', label: 'E-mail', divider: 'Contato' },
        { property: 'ddd', label: 'DDD' },
        { property: 'telefone', label: 'Telefone' },
        { property: 'status', label: 'Status' },
       

    ]

    public prospectData: any;


    public openDetailProspect(prospect : any){
        this.nomeprospect = prospect.nome;
        this.prospectData = prospect;
        this.ProspectModal.open();
      
    }
}

