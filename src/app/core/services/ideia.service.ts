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

  getIdeias(): Observable<BaseInterface<IdeiaInterface>>{
    return this._httpClient.get<BaseInterface<IdeiaInterface>>(`${environment.apiUrl}/ideias`)
  }

  getIdeiaById(id: number): Observable<IdeiaInterface>{
    return this._httpClient.get<IdeiaInterface>(`${environment.apiUrl}/ideias/${id}`)
  }

  updateIdeia(id: number, ideia: IdeiaInterface): Observable<IdeiaInterface>{
    return this._httpClient.put<IdeiaInterface>(`${environment.apiUrl}/ideias/${id}`, ideia)
  }

  deleteIdeia(id: number): Observable<void>{
    return this._httpClient.delete<void>(`${environment.apiUrl}/ideias/${id}`)
  }

  // Liga/desliga o voto: a API olha se este usuario ja votou e decide somar ou
  // subtrair. Nao mandamos corpo — quem esta votando vem do token.
  votar(id: number): Observable<IdeiaInterface>{
    return this._httpClient.patch<IdeiaInterface>(`${environment.apiUrl}/ideias/${id}/votar`, {})
  }
  getIdeiaByName(name: string): Observable<IdeiaInterface>{
    return this._httpClient.get<IdeiaInterface>(`${environment.apiUrl}/ideias/${name}`)
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
