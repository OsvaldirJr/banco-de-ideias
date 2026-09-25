import { CanDeactivateFn } from '@angular/router';
import type { CadastroUsuarioComponent } from '../../feature/cadastro-usuario/cadastro-usuario.component';

export const unsavedItemsGuard: CanDeactivateFn<CadastroUsuarioComponent> = (component, currentRoute, currentState, nextState) => {
  if(!component.podeDesativar()){
    return confirm("não pode sair")

  }
  return component.podeDesativar();
};
