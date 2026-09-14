import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../core/services/login.service';
import { Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.component.scss',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private ls = inject(LoginService);
  private router = inject(Router)
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
        localStorage.setItem('user_token', value.token);
        this.router.navigate(['/'])
      }
    })
  }
}
