import { Injectable, signal } from '@angular/core';

export interface UsuarioSessao {
  id: number;
  email: string;
}

const CHAVE_TOKEN = 'user_token';

@Injectable({
  providedIn: 'root'
})
export class SessaoService {
  private usuario = signal<UsuarioSessao | null>(lerUsuarioDoToken());

  public get user() {
    return this.usuario()
  }

  public entrar(token: string): void {
    localStorage.setItem(CHAVE_TOKEN, token);
    this.usuario.set(lerUsuarioDoToken());
  }

  public sair(): void {
    localStorage.removeItem(CHAVE_TOKEN);
    this.usuario.set(null);
  }
}

function lerUsuarioDoToken(): UsuarioSessao | null {
  const token = localStorage.getItem(CHAVE_TOKEN);
  const payload = token?.split('.')[1];
  if (!payload) {
    return null
  }

  try {
    const dados = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    return dados?.email ? { id: dados.sub, email: dados.email } : null;
  } catch {
    return null;
  }
}
