import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IdeiaService } from '../../core/services/ideia.service';
import { SessaoService } from '../../core/services/sessao.service';
import { IdeiaInterface, IdeiaInterfaceGroup } from '../../shared/interfaces/ideia.interface';

@Component({
    selector: 'app-cadastro',
    imports: [FormsModule, ReactiveFormsModule],
    templateUrl: './cadastro.component.html',
    styleUrl: './cadastro.component.scss',
})
export class CadastroComponent {
  public ideia = input<IdeiaInterface | null>(null);
  public salvo = output<void>();
  private _ideiaService = inject(IdeiaService);
  private _sessao = inject(SessaoService);
  public filteredIdeiasRX = [];
  private fb = inject(FormBuilder);
  public ideiaFormGroup = this.fb.group<IdeiaInterfaceGroup>({
    ideia: ['', Validators.required],
    resolve: ['', Validators.required],
    categoria: ['', Validators.required]
  }
)

  constructor() {
    effect(() => {
      const ideia = this.ideia();
      if (!ideia) {
        this.ideiaFormGroup.reset({ ideia: '', resolve: '', categoria: '' })
        return
      }
      this.ideiaFormGroup.patchValue({
        ideia: ideia.ideia,
        resolve: ideia.resolve,
        categoria: ideia.categoria ?? ''
      })
    })
  }

  get ideiaValue() {return this.ideiaFormGroup.get('ideia')}
  get resolveValue() {return this.ideiaFormGroup.get('resolve')}
  get categoriaValue() {return this.ideiaFormGroup.get('categoria')}

  public enviar(): void {
    const emEdicao = this.ideia();
    const dados = this.ideiaFormGroup.getRawValue();

    const requisicao = emEdicao?.id
      ? this._ideiaService.updateIdeia(emEdicao.id, dados)
      : this._ideiaService.saveIdea({ ...dados, autor: this._sessao.user?.email ?? null });

    requisicao.subscribe({
      next:()=>{
        if (!emEdicao) {
          this.ideiaFormGroup.reset({ ideia: '', resolve: '', categoria: '' })
        }
        this.salvo.emit()
      }
    });
  }
}
