import { inject, Injectable } from '@angular/core';
import { IdeiaInterface } from '../../shared/interfaces/ideia.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, Observable } from 'rxjs';
import { BaseInterface } from '../../shared/interfaces/base.interface';

@Injectable({
  providedIn: 'root'
})
export class IdeiaService {
  // salva os itens no localStorage
  private _httpClient = inject(HttpClient);

  saveIdea(ideia: IdeiaInterface): Observable<IdeiaInterface>{
    return this._httpClient.post<IdeiaInterface>(`${environment.apiUrl}/ideias`, ideia)
  }

  getIdeias(): Observable<BaseInterface>{
    return this._httpClient.get<BaseInterface>(`${environment.apiUrl}/ideias`)
  }

  getIdeiaById(id: string): Observable<IdeiaInterface>{
    return this._httpClient.get<IdeiaInterface>(`${environment.apiUrl}/ideias/${id}`)
  }

  saveListaIdeiasDb(listaDeIdeias: IdeiaInterface[]): void{
    const listaDeIdeiasString = JSON.stringify(listaDeIdeias);
    localStorage.setItem('listaIdeias', listaDeIdeiasString);
  }
 // busca os itens no localStorage
  getListaIdeiasDb(): IdeiaInterface[]{
    const listaDeIdeiasString = localStorage.getItem('listaIdeias');
    try{
      const listaDeIdeias: IdeiaInterface[] = JSON.parse(listaDeIdeiasString!);
      return listaDeIdeias;
    }catch(e){
      return [];
    }
  }
}
