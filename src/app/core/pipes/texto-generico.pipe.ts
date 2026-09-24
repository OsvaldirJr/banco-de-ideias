import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textoGenerico',
  standalone: true
})
export class TextoGenericoPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    console.log(args)
    return `${args[0]} ${value}`;
  }
}
