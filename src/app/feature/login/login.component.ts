import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../core/services/login.service';
import { SessaoService } from '../../core/services/sessao.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.component.scss',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private ls = inject(LoginService);
  private router = inject(Router)
  private sessao = inject(SessaoService)
  public loginForm = this.fb.group({
    email: ['', Validators.required],
    senha: ['', Validators.required]
  })

  get userValue() {return this.loginForm.get('email')}
  get passValue() {return this.loginForm.get('senha')}

  public login(){
    let dados = this.loginForm.getRawValue();
    this.ls.login(dados).subscribe({
      next:(value: any)=>{
        this.sessao.entrar(value.token);
        this.router.navigate(['/']);
      }
    })
  }
}
