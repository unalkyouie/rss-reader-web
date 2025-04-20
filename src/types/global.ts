export interface Feed {
  lastUpdated?: string;
  name: string;
  url: string;
}

export interface Article {
  id: string;
  title: string;
  link: string | null;
  pubDate: Date | null;
  feedTitle: string;
  description: string | null;
  content: string | null;
}
