import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatarData',
  standalone: true
})
export class FormatarDataPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }

    const date = new Date(value);
    const pad = (num: number) => num.toString().padStart(2, '0');

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  }

}
