import React from "react";
import useFeedArticles from "../hooks/useFeedArticles";

type Props = {
    url: string;
}

const ArticlesList = ({url}: Props) => {
    const {articles, error, loading} = useFeedArticles(url);

    const sortedArticles = [...articles].sort(
        (a,b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading articles: {error}</div>;
    if (!articles.length) return <div>No articles found</div>;

    return (
        <div>
            <h2>Articles</h2>
            <ul>
                {sortedArticles.map((article, index) => (
                    <li key={`${article.link}-${index}`}>
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