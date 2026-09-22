import { HttpClient } from "@angular/common/http";
import { inject, Service } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { AutenticacaoResposta, CadastroInterface, LoginInterface } from "../../shared/interfaces/cadastro.interface";

@Service()
export class LoginService{
    private _httpClient = inject(HttpClient);
    public login(cadastro: LoginInterface): Observable<AutenticacaoResposta>{
       return  this._httpClient.post<AutenticacaoResposta>(`${environment.apiUrl}/auth/login`, cadastro)
    }

    public cadastro(cadastro: CadastroInterface): Observable<AutenticacaoResposta>{
       return  this._httpClient.post<AutenticacaoResposta>(`${environment.apiUrl}/auth/cadastro`, cadastro)
    }
}
