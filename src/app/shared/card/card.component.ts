import { Component, inject, input} from '@angular/core';
import { IdeiaInterface } from '../interfaces/ideia.interface';
import { Router } from "@angular/router";

@Component({
  selector: 'app-banco-de-ideias-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  public ideia = input.required<IdeiaInterface>();
  private _router = inject(Router);

  public navigate(): void{
    this._router.navigate(['/ideia', this.ideia().id]);
  }
}
