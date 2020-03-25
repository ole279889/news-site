export class BBCode {
  public readonly regexp: RegExp;

  constructor(regexp: string, public readonly replacement: string) {
    this.regexp = new RegExp(regexp, 'igm');
  }
}
