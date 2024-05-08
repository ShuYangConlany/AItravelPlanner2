import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true
})
export class DurationPipe implements PipeTransform {
  transform(value: string): string {
    const matches = value.match(/PT(\d+H)?(\d+M)?/);
    if (!matches) return ''; 

    const hours = matches[1] ? matches[1].slice(0, -1) + 'h ' : '';
    const minutes = matches[2] ? matches[2].slice(0, -1) + 'min' : '';
    return hours + minutes;
  }
}
