import { Component, inject, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IdeiaService } from '../../core/services/ideia.service';
import { BehaviorSubject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-ideia',
    imports: [],
    templateUrl: './ideia.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './ideia.component.scss'
})
export class IdeiaComponent implements OnInit, OnDestroy{
  actvatedRoute = inject(ActivatedRoute);
  ideiaService =  inject(IdeiaService);
  //CODEREVIEW atualizar o Angular para usar o takeUntilDestroy
  destroy = new BehaviorSubject<boolean>(false)

  ngOnInit(): void {
    //CODEREVIEW - RXJS para juntar essas consultas
    this.actvatedRoute.paramMap
    .pipe(takeUntil(this.destroy))
    .subscribe((paramMap: any)=>{
      this.ideiaService.getIdeiaById(paramMap.params.id)
      .subscribe({
        next: (value)=>{
            console.log(value)
        }
      })
    })
  }
  
  ngOnDestroy(): void {
    this.destroy.next(true)
    this.destroy.complete()
  }
}
