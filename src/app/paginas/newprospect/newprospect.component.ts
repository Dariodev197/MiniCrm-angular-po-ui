import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ForceOptionComponentEnum, PoButtonModule, PoDynamicFormField, PoDynamicModule, PoNotificationService } from '@po-ui/ng-components';
import { environment } from '../../../environments/environment';
import { PoPageModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-newprospect',
  standalone: true,
  imports: [PoDynamicModule,PoButtonModule,PoPageModule],
  templateUrl: './newprospect.component.html',
  styleUrl: './newprospect.component.css'
})
export class NewprospectComponent {
    
    
    public fields: PoDynamicFormField[] = [
        { property: 'tipopessoa', label: 'Tipo de Pessoa', gridColumns: 6,gridSmColumns: 12, options: [
            { label: 'Pessoa Física'  , value: 'F' },
            { label: 'Pessoa Jurídica', value: 'J' },
            { label: 'Outros'         , value: 'X' }
        ],
        fieldLabel:'label',
        fieldValue:'value',
        forceOptionsComponentType: ForceOptionComponentEnum.select,
    },
        { property: 'cgc'     , label: 'CGC/CNPJ', gridColumns: 3,gridSmColumns: 6 },
        { property: 'nome'    , label: 'Nome', required: true ,gridColumns: 6, gridSmColumns: 12 , placeholder:'Informe o nome do cliente' },
        { property: 'contato' , label: 'Contato', gridColumns: 3,gridSmColumns: 12, placeholder:'Informe o contato do cliente' },
        { property: 'endereco', label: 'Endereço', gridColumns: 5,gridSmColumns: 12, placeholder:'Informe o endereço do cliente', divider: 'Endereço' },
        { property: 'email'   , label: 'E-mail', gridColumns: 10,gridSmColumns: 12,placeholder:'Informe o e-mail do cliente', divider: 'Contato',type: 'contato' },
        { property: 'ddd'     , label: 'DDD', gridColumns: 3,gridSmColumns: 3,placeholder:'Informe o DDD do cliente' },
        { property: 'telefone', label: 'Telefone', gridColumns: 9,gridSmColumns: 9,mask:'(00) 00000-0000' },
        { property: 'homepage', label: 'Home Page',gridColumns:12,gridSmColumns:12}
        
    ];  

    private http   = inject(HttpClient);
    private router = inject(Router);
    private url: string = environment.url;
    private notify = inject(PoNotificationService)

    public ConfirmeForm(form: any){
        this.http.post<any>(`${this.url}/curso/api/prospects`,form)
        .subscribe({
            next: value  => this.notify.success({duration: 5000,message: `Novo Prospects ${value.codigo}`}),
            error: err   => this.notify.error(err.error.status),
            complete: () => this.router.navigate(['/Prospects'])
        })

    }
}   
