import { Routes } from '@angular/router';
import { CadastroComponent } from './feature/cadastro/cadastro.component';
import { IdeiaComponent } from './feature/ideia/ideia.component';
import { LoginComponent } from './feature/login/login.component';
import { CadastroUsuarioComponent } from './feature/cadastro-usuario/cadastro-usuario.component';
import { HomeComponent } from './feature/home/home.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'cadastro-usuario',
        component:CadastroUsuarioComponent
    },
    {
        path:'ideia',
        component:IdeiaComponent
    },
    {
        path:'ideia/:id',
        component:IdeiaComponent,
    }
];
