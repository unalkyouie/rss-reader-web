import { useEffect, useState } from "react";
import { ArticlesList } from "../types";
import RSSParser from 'rss-parser';

const useFeedArticles =(url:string) =>{
    const [articles, setArticles]=useState<ArticlesList>([]);
    const [loading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string|null>(null);

    useEffect(()=>{
        const fetchArticles = async ()=>{
            try {
                const parser = new RSSParser();
                const feed = await parser.parseURL(url);
                const parsedArticles = feed.items.map((item:any)=>({
                    title: item.title,
                    link: item.link, 
                    pubDate: item.pubDate,
                    feedTitle: feed.title,
                }));
                setArticles(parsedArticles);
                setIsLoading(false)
            }catch (error:any){
                setError('Failed to load articles');
                setIsLoading(false);
            }
        };

        fetchArticles();
    }, [url]);


    return {error, loading, articles}
}

export default useFeedArticles;