import React from "react";

export type Feed = {
    id: number, 
    title: string
}

type Props = {
    feeds: Array<Feed>
}

const FeedList: React.FC<Props> = ({feeds}) => {

if(!feeds.length) {
    return(<p>No feeds available</p>)
}

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