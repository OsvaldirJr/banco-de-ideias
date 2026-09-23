import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../core/services/login.service';
import { SessaoService } from '../../core/services/sessao.service';

@Component({
  selector: 'app-cadastro-usuario',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.scss',
})
export class CadastroUsuarioComponent {
  private fb = inject(FormBuilder);
  private loginService = inject(LoginService);
  private sessao = inject(SessaoService);
  private router = inject(Router);
  public erro = signal('');
  public enviando = signal(false);
  public cadastroForm = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(8)]],
  });

  get nomeValue() {return this.cadastroForm.get('nome')}
  get emailValue() {return this.cadastroForm.get('email')}
  get senhaValue() {return this.cadastroForm.get('senha')}

  public cadastrar(): void {
    this.erro.set('');
    this.enviando.set(true);

    this.loginService.cadastro(this.cadastroForm.getRawValue()).subscribe({
      next: (resposta) => {
        this.sessao.entrar(resposta.token);
        this.router.navigate(['/']);
      },
      error: (erro: Error) => {
        this.enviando.set(false);
        this.erro.set(mensagemDoErro(erro));
      }
    });
  }
  public podeDesativar(){
    return !this.cadastroForm.dirty
  }
}

function mensagemDoErro(erro: Error): string {
  const corpo = (erro.cause as HttpErrorResponse | undefined)?.error;

  if (corpo?.detalhes?.length) {
    return corpo.detalhes.join(' ')
  }

  return corpo?.erro ?? 'Nao foi possivel concluir o cadastro. Tente novamente.';
}
