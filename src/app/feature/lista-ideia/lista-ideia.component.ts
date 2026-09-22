import { Component, input } from '@angular/core';
import { IdeiaInterface } from '../../shared/interfaces/ideia.interface';
import { AsyncPipe } from '@angular/common';
import { CardComponent } from '../../shared/card/card.component';

@Component({
  imports: [CardComponent],
  selector: 'app-lista-ideia',
  styleUrl: './lista-ideia.component.scss',
  templateUrl: './lista-ideia.component.html',
})
export class ListaIdeiaComponent {
  filteredIdeias = input.required<IdeiaInterface[] | undefined>();
}
