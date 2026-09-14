import { HttpClient } from "@angular/common/http";
import { inject, Service } from "@angular/core";
import { environment } from "../../../environments/environment";
import { CadastroInterface, LoginInterface } from "../../shared/interfaces/cadastro.interface";

@Service()
export class LoginService{
    private _httpClient = inject(HttpClient);
    public login(cadastro: LoginInterface){
       return  this._httpClient.post(`${environment.apiUrl}/auth/login`, cadastro)
    }

    public cadastro(cadastro: CadastroInterface){
       return  this._httpClient.post(`${environment.apiUrl}/auth/cadastro`, cadastro)
    }
} 