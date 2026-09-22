import { Component, ElementRef, input, output, viewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  public titulo = input('');
  public fechado = output<void>();
  private dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  public abrir(): void {
    this.dialog().nativeElement.showModal();
  }

  public fechar(): void {
    this.dialog().nativeElement.close();
  }

  public cliqueNoFundo(evento: MouseEvent): void {
    if (evento.target === this.dialog().nativeElement) {
      this.fechar();
    }
  }
}
