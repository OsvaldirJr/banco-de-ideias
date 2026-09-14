import { ChangeDetectionStrategy, Component, computed, DestroyRef, effect, inject, signal, WritableSignal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardComponent } from '../../shared/card/card.component';
import { IdeiaInterface, IdeiaInterfaceGroup } from '../../shared/interfaces/ideia.interface';
import { IdeiaService } from '../../core/services/ideia.service';
import { BaseInterface } from '../../shared/interfaces/base.interface';
import { httpResource } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { debounceTime, forkJoin, fromEvent, map, Observable, of, pipe, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { ValidationError } from '@angular/forms/signals';

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
  public filteredIdeiasRX = [];
  private fb = inject(FormBuilder);
  public ideiaFormGroup = this.fb.group<IdeiaInterfaceGroup>({
    ideia: ['', Validators.required],
    resolve: ['', Validators.required]
  },{
    validators:[this.validateSamePass]
  }
) 

validateSamePass(control: AbstractControl){
  return { passwordMismatch: true}
}

  get ideiaValue() {return this.ideiaFormGroup.get('ideia')}
  get resolveValue() {return this.ideiaFormGroup.get('resolve')}

  public firstIdeia!: Observable<IdeiaInterface>
  private destroyRef = inject(DestroyRef);
  public filteredIdeias = computed(()=>{
    if(this.pesquisar() && this.listaDeIdeias.hasValue()){
      return this.listaDeIdeias.value()?.dados.filter(x=>x.ideia.includes(this.pesquisar()))
    }
    return this.listaDeIdeias.value()?.dados
  })
  private _ideiaService =  inject(IdeiaService);

  public counter = computed(()=>{
    return this.listaDeIdeias.hasValue() ? this.listaDeIdeias.value().dados.length : 0
  });

  constructor(){
    this.firstIdeia = this._ideiaService.getIdeiaById(1)

    effect(()=>{
      console.log(`o counter de carde mudou para${this.counter()}`)
    })

    
    
    this.pesquisarControl.valueChanges
    .pipe(
      takeUntilDestroyed(this.destroyRef),
      debounceTime(3000),
      switchMap((term) => this._ideiaService.getIdeias()),
      tap(x=>{console.log(x)}),
      map(x=>{ return x })
    ).subscribe(x=>{
      console.log(x)
    })
  }

  public enviar(): void {
    
    this._ideiaService.saveIdea(this.ideiaFormGroup.getRawValue()).subscribe({
      next:(value)=>{
        this.listaDeIdeias.reload();
        this.ideiaFormGroup.get('ideia')?.disable()
      }
    });
    // this.ideiaFormGroup.reset()
  }
  pesquisa(event: any){
    this.pesquisar.set(event.target.value)
    
    this.pesquisar.update((value)=> {
      
      return ""
    })
  }
}
