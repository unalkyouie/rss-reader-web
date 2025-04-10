import React from "react";
import { Feed } from "../types";

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
            <h2>{feed.name}</h2>
        </div>
    ))}
    </div>
)
}

export default FeedList;