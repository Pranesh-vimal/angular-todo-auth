import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleCase',
})
export class TitleCasePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    if (!value) return null;
    let words = value.split(' ');

    for (var i = 0; i < words.length; i++) {
      let word = words[i];
      words[i] = this.toTitleCase(word);
    }
    return words.join(' ');
  }

  private toTitleCase(word: string): string {
    return word.substr(0, 1).toUpperCase() + word.substr(1).toLowerCase();
  }
}
