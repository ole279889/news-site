export interface INewsItem {
  id: number;
  preview: string;
  shortDescription: string;
  fullDescription: string;
}

export class NewsItem implements INewsItem {
  id: number;
  preview: string;
  shortDescription: string;
  fullDescription: string;

  constructor(data: INewsItem) {
    this.id = data.id;
    this.preview = data.preview;
    this.shortDescription = data.shortDescription;
    this.fullDescription = data.fullDescription;
  }
}
