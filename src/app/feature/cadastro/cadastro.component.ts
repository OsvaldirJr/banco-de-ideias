import { ChangeDetectionStrategy, Component, computed, DestroyRef, effect, inject, signal, WritableSignal } from '@angular/core';
import { FormControl, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from '../../shared/card/card.component';
import { IdeiaInterface } from '../../shared/interfaces/ideia.interface';
import { IdeiaService } from '../../core/services/ideia.service';
import { BaseInterface } from '../../shared/interfaces/base.interface';
import { httpResource } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { debounceTime, fromEvent, map, pipe, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-cadastro',
    imports: [FormsModule, CardComponent, ReactiveFormsModule, AsyncPipe],
    templateUrl: './cadastro.component.html',
    styleUrl: './cadastro.component.scss',
})
export class CadastroComponent {

  //CODEREVIEW - traduzir
  public titulo = "Banco de ideias"
  public listaDeIdeias = httpResource<BaseInterface<IdeiaInterface>>(() => `${environment.apiUrl}/ideias`);
  public pesquisar = signal("");
  public pesquisarControl = new FormControl('')
  public filteredIdeiasRX = []

  public firstIdeia: any 
  private destroyRef = inject(DestroyRef);
  public filteredIdeias = computed(()=>{
    if(this.pesquisar() && this.listaDeIdeias.hasValue()){
      return this.listaDeIdeias.value()?.dados.filter(x=>x.ideia.includes(this.pesquisar()))
    }
    return this.listaDeIdeias.value()?.dados
  })
  private _ideiaService =  inject(IdeiaService);
  private userCounter = signal(0)
  public counter = computed(()=>{
    return this.listaDeIdeias.hasValue() ? this.listaDeIdeias.value().dados.length : 0
  });

  constructor(){
    this.firstIdeia = this._ideiaService.getIdeiaById("6aa04430ce1ca1d0c150e204")
    
    effect(()=>{
      console.log(`o counter de carde mudou para${this.counter()}`)
    })
    this.pesquisarControl.valueChanges
    .pipe(
      takeUntilDestroyed(this.destroyRef),
      debounceTime(3000),
      switchMap((term) => this._ideiaService.getIdeias())
    ).subscribe(x=>{
      console.log(x)
    })
  
    
    
  }

  public enviar(cadastroForm: NgForm): void {
    cadastroForm.control.value;
    this._ideiaService.saveIdea(cadastroForm.control.value).subscribe({
      next:(value)=>{
        this.listaDeIdeias.reload();
      }
    });
    cadastroForm.control.reset();
  }
  pesquisa(event: any){
    this.pesquisar.set(event.target.value)
    
    this.pesquisar.update((value)=> {
      
      return ""
    })
  }
}
