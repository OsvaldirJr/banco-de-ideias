import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CardComponent } from '../../shared/card/card.component';
import { IdeiaInterface } from '../../shared/interfaces/ideia.interface';
import { IdeiaService } from '../../core/services/ideia.service';
import { BaseInterface } from '../../shared/interfaces/base.interface';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, CardComponent],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit{

  //CODEREVIEW - traduzir
  public titulo = "Banco de ideias"
  public listaDeIdeias: IdeiaInterface[] = [];
  private _ideiaService =  inject(IdeiaService);

  ngOnInit(){
  this._ideiaService.getIdeias().subscribe({
    next:(value: BaseInterface)=>{
      this.listaDeIdeias = value.dados
    }
  })
  }

  public enviar(cadastroForm: NgForm): void {
    cadastroForm.control.value;
    this._ideiaService.saveIdea(cadastroForm.control.value).subscribe({
      next:(value)=>{
        this.listaDeIdeias.push(value);
      }
    });
    cadastroForm.control.reset();
  }
}
