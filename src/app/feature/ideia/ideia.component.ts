import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { httpResource } from '@angular/common/http';
import { map } from 'rxjs';
import { IdeiaService } from '../../core/services/ideia.service';
import { SessaoService } from '../../core/services/sessao.service';
import { IdeiaInterface } from '../../shared/interfaces/ideia.interface';
import { environment } from '../../../environments/environment';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
    selector: 'app-ideia',
    imports: [RouterLink, CadastroComponent, ModalComponent],
    templateUrl: './ideia.component.html',
    styleUrl: './ideia.component.scss'
})
export class IdeiaComponent {
  private rota = inject(ActivatedRoute);
  private router = inject(Router);
  private _ideiaService = inject(IdeiaService);
  private _sessao = inject(SessaoService);
  private id = toSignal(this.rota.paramMap.pipe(map(parametros => parametros.get('id'))));
  public ideiaResource = httpResource<IdeiaInterface>(() => {
    const id = this.id();
    return id ? `${environment.apiUrl}/ideias/${id}` : undefined;
  });

  public ideia = computed(() => this.ideiaResource.hasValue() ? this.ideiaResource.value() : null);
  public erro = computed(() => this.ideiaResource.error()?.message ?? '');

  public souAutor = computed(() => {
    const ideia = this.ideia();
    if (typeof ideia?.souAutor === 'boolean') {
      return ideia.souAutor
    }
    const autor = ideia?.autor;
    const email = this._sessao.user?.email;
    return !!autor && !!email && autor === email;
  });

  public votos = computed(() => this.ideia()?.votos ?? 0);
  public votei = computed(() => this.ideia()?.votei ?? false);
  public podeVotar = computed(() => !!this.ideia() && !!this._sessao.user && !this.souAutor());

  public votando = signal(false);
  public erroVoto = signal('');

  public itens = computed(() => {
    const ideia = this.ideia();
    if (!ideia) {
      return []
    }
    return [
      { rotulo: 'Titulo', valor: ideia.ideia },
      { rotulo: 'Categoria', valor: ideia.categoria || 'Sem categoria' },
      { rotulo: 'O que resolve', valor: ideia.resolve },
      { rotulo: 'Autor', valor: ideia.autor || 'Anonimo' },
      { rotulo: 'Criada em', valor: ideia.criadoEm ? new Date(ideia.criadoEm).toLocaleString('pt-BR') : '-' },
    ]
  });

  public votar(): void {
    const id = this.ideia()?.id;
    if (!id || this.votando() || !this.podeVotar()) {
      return
    }

    this.votando.set(true);
    this.erroVoto.set('');

    this._ideiaService.votar(id).subscribe({
      next: (ideia) => {
        this.ideiaResource.set(ideia);
        this.votando.set(false);
      },
      error: () => {
        this.erroVoto.set('Não foi possível registrar seu voto. Tente de novo.');
        this.votando.set(false);
      }
    });
  }

  public aoSalvar(modal: ModalComponent): void {
    modal.fechar();
    this.ideiaResource.reload();
  }

  public excluir(modal: ModalComponent): void {
    const id = this.ideia()?.id;
    if (!id) {
      return
    }
    this._ideiaService.deleteIdeia(id).subscribe({
      next: () => {
        modal.fechar();
        this.router.navigate(['/']);
      }
    });
  }
}
