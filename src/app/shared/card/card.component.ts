import { Component, inject, input, ChangeDetectionStrategy } from '@angular/core';
import { IdeiaInterface } from '../interfaces/ideia.interface';
import { Router, RouterModule } from "@angular/router";
import { UpperCasePipe } from '@angular/common';
import { HighlightDirective } from '../../core/directives/highlight.directive';
import { TextoGenericoPipe } from '../../core/pipes/texto-generico.pipe';

@Component({
  selector: 'app-banco-de-ideias-card',
  imports:[RouterModule, UpperCasePipe, HighlightDirective, TextoGenericoPipe],
  standalone: true,
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './card.component.scss'
})
export class CardComponent {
  public ideia = input.required<IdeiaInterface>();
}
