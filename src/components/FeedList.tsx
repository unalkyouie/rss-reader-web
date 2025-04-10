import React from "react";

export interface Feed {
    id: number, 
    title: string
}

interface Props {
    feeds: Array<Feed>
}

const FeedList: React.FC<Props> = ({feeds}) => {
return (
    <div>
    {feeds.map((feed)=> (
         <div key ={feed.id}>
            <h2>{feed.title}</h2>
        </div>
    ))}
    </div>
)
}

export default FeedList;