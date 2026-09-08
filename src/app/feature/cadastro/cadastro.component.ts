import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CardComponent } from '../../shared/card/card.component';
import { IdeiaInterface } from '../../shared/interfaces/ideia.interface';
import { IdeiaService } from '../../core/services/ideia.service';
import { BaseInterface } from '../../shared/interfaces/base.interface';
import { httpResource } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-cadastro',
    imports: [FormsModule, CardComponent],
    templateUrl: './cadastro.component.html',
    styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {

  //CODEREVIEW - traduzir
  public titulo = "Banco de ideias"
  public listaDeIdeias = httpResource<BaseInterface<IdeiaInterface>>(() => `${environment.apiUrl}/ideias`);
  private _ideiaService =  inject(IdeiaService);


  public enviar(cadastroForm: NgForm): void {
    cadastroForm.control.value;
    this._ideiaService.saveIdea(cadastroForm.control.value).subscribe({
      next:(value)=>{
        this.listaDeIdeias.reload()
      }
    });
    cadastroForm.control.reset();
  }
}
