import { Component, computed, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { IdeiaInterface } from '../../shared/interfaces/ideia.interface';
import { FiltroInterface } from '../../shared/interfaces/filtro.interface';
import { httpResource } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BaseInterface } from '../../shared/interfaces/base.interface';
import { IdeiaService } from '../../core/services/ideia.service';
import { AsyncPipe } from '@angular/common';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { ListaIdeiaComponent } from '../lista-ideia/lista-ideia.component';
import { FiltroComponent } from '../../shared/filtro/filtro.component';
import { ModalComponent } from '../../shared/modal/modal.component';
import { SessaoService } from '../../core/services/sessao.service';
import { Router } from '@angular/router';

function diaLocal(iso: string): string {
  const data = new Date(iso);
  const mes = `${data.getMonth() + 1}`.padStart(2, '0');
  const dia = `${data.getDate()}`.padStart(2, '0');
  return `${data.getFullYear()}-${mes}-${dia}`;
}

@Component({
  imports: [CadastroComponent, ListaIdeiaComponent, FiltroComponent, ModalComponent],
  selector: 'app-home',
  styleUrl: './home.component.scss',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public listaDeIdeias = httpResource<BaseInterface<IdeiaInterface>>(() => `${environment.apiUrl}/ideias`);
  public filtro = signal<FiltroInterface>({ texto: '', categoria: '', dataInicio: '', dataFim: '' });
  public sessao = inject(SessaoService);
  private router = inject(Router);
  public categorias = computed(() => {
    if (!this.listaDeIdeias.hasValue()) {
      return []
    }
    const todas = this.listaDeIdeias.value().dados
      .map(x => x.categoria)
      .filter((categoria): categoria is string => !!categoria)
    return [...new Set(todas)].sort()
  });

  public filteredIdeias = computed(() => {
    if (!this.listaDeIdeias.hasValue()) {
      return []
    }
    const { texto, categoria, dataInicio, dataFim } = this.filtro()
    const termo = texto.trim().toLowerCase()

    return this.listaDeIdeias.value().dados.filter(ideia => {
      if (termo) {
        const alvo = `${ideia.ideia} ${ideia.resolve} ${ideia.categoria ?? ''}`.toLowerCase()
        if (!alvo.includes(termo)) {
          return false
        }
      }

      if (categoria && ideia.categoria !== categoria) {
        return false
      }

      if (dataInicio || dataFim) {
        if (!ideia.criadoEm) {
          return false
        }
        const dia = diaLocal(ideia.criadoEm)
        if (dataInicio && dia < dataInicio) {
          return false
        }
        if (dataFim && dia > dataFim) {
          return false
        }
      }

      return true
    })
  })

  public counter = computed(() => this.filteredIdeias().length);
  public total = computed(() => this.listaDeIdeias.hasValue() ? this.listaDeIdeias.value().dados.length : 0);
  public erro = computed(() => this.listaDeIdeias.error()?.message ?? '')

  public aoSalvar(modal: ModalComponent): void {
    modal.fechar();
    this.listaDeIdeias.reload();
  }

  logout(){
    this.sessao.sair();
    this.router.navigate(['/login']);
  }
}
