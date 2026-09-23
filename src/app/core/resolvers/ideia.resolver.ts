import { inject, Injectable, Service } from "@angular/core";
import { ActivatedRouteSnapshot, MaybeAsync, RedirectCommand, Resolve, RouterStateSnapshot } from "@angular/router";
import { IdeiaInterface } from "../../shared/interfaces/ideia.interface";
import { IdeiaService } from "../services/ideia.service";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class IdeiaResolver implements Resolve<IdeiaInterface>{
    private _ideiaService = inject(IdeiaService);
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IdeiaInterface> {
        const id = route.paramMap.get('id') ? + route.paramMap.get('id')! : 0
        return this._ideiaService.getIdeiaById(id)
    }

}