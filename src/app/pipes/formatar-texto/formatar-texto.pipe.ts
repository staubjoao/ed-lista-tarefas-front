import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatarTexto',
  standalone: true
})
export class FormatarTextoPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }

    const tamanhoMaximo = 10;
    return value.length > tamanhoMaximo ? value.slice(0, tamanhoMaximo) + "..." : value;
  }

}
