import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { unsavedItemsGuard } from './core/guards/unsaved-items-guard.guard';
import { IdeiaResolver } from './core/resolvers/ideia.resolver';

export const routes: Routes = [
    {
        path:'',
        loadComponent: () => import('./feature/home/home.component').then(m => m.HomeComponent),
        canActivate:[authGuard]
    },
    {
        path:'login',
        loadComponent: () => import('./feature/login/login.component').then(m => m.LoginComponent)
    },
    {
        path:'cadastro-usuario',
        loadComponent: () => import('./feature/cadastro-usuario/cadastro-usuario.component').then(m => m.CadastroUsuarioComponent),
        canDeactivate:[unsavedItemsGuard]
    },
    {
        path:'ideia/:id',
        loadComponent: () => import('./feature/ideia/ideia.component').then(m => m.IdeiaComponent),
        resolve: {ideia: IdeiaResolver}
    }
];
