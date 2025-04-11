import React from "react";
import { ArticlesList as ListType } from "../types";

type Props ={
    articles: ListType;
}

const ArticlesList = ({articles}:Props)=>{
    const sortedArticles=[...articles].sort(
        (a,b)=> new Date(b.pubDate).getTime()-new Date(a.pubDate).getTime()
    );

    return(
        <div>
            <h2>Articles</h2>
            <ul>
                {sortedArticles.map((article, index)=>(
                    <li key={index}>
                        <a href={article.link} target="_blank" rel="noopener noreferrer">
                            {article.title}
                        </a>
                        <div>
                            <small>
                                {article.feedTitle} - {new Date(article.pubDate).toLocaleString()}
                            </small>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ArticlesList;