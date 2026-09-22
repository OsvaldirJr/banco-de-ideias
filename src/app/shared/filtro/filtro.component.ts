import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';
import { FiltroInterface } from '../interfaces/filtro.interface';

@Component({
  selector: 'app-filtro',
  imports: [ReactiveFormsModule],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.scss',
})
export class FiltroComponent {
  public categorias = input<string[]>([]);
  public filtrar = output<FiltroInterface>();
  private fb = inject(FormBuilder);
  public filtroForm = this.fb.nonNullable.group({
    texto: [''],
    categoria: [''],
    dataInicio: [''],
    dataFim: ['']
  });

  constructor() {
    this.filtroForm.valueChanges
      .pipe(debounceTime(300), takeUntilDestroyed())
      .subscribe(() => this.filtrar.emit(this.filtroForm.getRawValue()));
  }

  public limpar(): void {
    this.filtroForm.reset();
  }
}
