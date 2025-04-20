export interface Feed {
  lastUpdated?: string;
  name: string;
  url: string;
}

export type FeedList = Array<Feed>;

export interface Article {
  title: string;
  link: string;
  pubDate: string;
  feedTitle?: string;
  content?: string;
}
export type ArticlesList = Array<Article>;

export interface ParsedArticle {
  title: string;
  link: string | null;
  pubDate: Date | null;
  feedTitle: string;
  description: string | null;
}
