export type Feed = {
    id: number, 
    name: string
    url: string
}

export type FeedList = Array<Feed>;

export type Article = {
    title: string, 
    link: string
    pubDate: string
    feedTitle: string;
}
export type ArticlesList = Array<Article>