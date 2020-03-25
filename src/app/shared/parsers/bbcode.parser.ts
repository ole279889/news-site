import { Injectable } from '@angular/core';
import { BBCode } from '../models/bbcode';

interface Parser {
  parse(text: string): string;
}

@Injectable()
export class BBCodeParser implements Parser {
  codes: BBCode[] = [];

  constructor() {
    this.setDefaults();
  }

  private static defaults(): BBCode[] {
    return [
      new BBCode('\\[spoiler\\](.+?)\\[\\/spoiler\\]', `<app-content-hide [contentToHide]="'${'$1'}'"></app-content-hide>`),
      new BBCode('\\[hide\\](.+?)\\[\\/hide\\]', `<app-accordeon [text]="'${'$1'}'"></app-accordeon>`),
      new BBCode('\\[tooltip text="(.+?)"\\](.+?)\\[\\/tooltip\\]', `<app-tooltip [text]="'${'$1'}'" [targetText]="'${'$2'}'"></app-tooltip>`),
    ];
  }

  public setDefaults(): void {
    this.codes = BBCodeParser.defaults();
  }

  public parse(text: string): string {
    return this.codes
      .reduce((acc, code) => acc
        .replace(code.regexp, code.replacement), text,
      );
  }

}
