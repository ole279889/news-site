import { Pipe, PipeTransform } from '@angular/core';
import { BBCodeParser } from '../parsers/bbcode.parser';

@Pipe({
  name: 'decode',
  pure: true
})
export class DecodePipe implements PipeTransform {
  constructor(private parser: BBCodeParser) {
  }

  public transform(value: string): string {
    return this.parser.parse(value);
  }
}
