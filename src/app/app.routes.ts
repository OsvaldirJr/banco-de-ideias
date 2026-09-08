import { Routes } from '@angular/router';
import { CadastroComponent } from './feature/cadastro/cadastro.component';
import { IdeiaComponent } from './feature/ideia/ideia.component';

export const routes: Routes = [
    {
        path:'',
        component:CadastroComponent
    },
    {
        path:'ideia',
        component:IdeiaComponent
    },
    {
        path:'ideia/:id',
        component:IdeiaComponent
    }
];
