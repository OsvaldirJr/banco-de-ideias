import { Routes } from '@angular/router';
import { CadastroComponent } from './feature/cadastro/cadastro.component';
import { IdeiaComponent } from './feature/ideia/ideia.component';
import { LoginComponent } from './feature/login/login.component';
import { CadastroUsuarioComponent } from './feature/cadastro-usuario/cadastro-usuario.component';
import { HomeComponent } from './feature/home/home.component';
import { authGuard } from './core/guards/auth.guard';
import { unsavedItemsGuard } from './core/guards/unsaved-items-guard.guard';
import { IdeiaResolver } from './core/resolvers/ideia.resolver';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent, 
        canActivate:[authGuard]
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'cadastro-usuario',
        component:CadastroUsuarioComponent,
        canDeactivate:[unsavedItemsGuard]
    },
    {
        path:'ideia',
        component:IdeiaComponent
    },
    {
        path:'ideia/:id',
        component:IdeiaComponent,
        resolve: {ideia: IdeiaResolver}
    }
];
