import React, {useState} from 'react';

type Props = {
    onAddFeed: (feed: {name: string, url: string}) => void;
}

const FeedForm = ({onAddFeed}:Props) => {
    const [name, setName]=useState('');
    const [url, setUrl] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if( name && url){
            onAddFeed({name, url});
            setName('');
            setUrl('');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder='Feed Name'
                value={name}
                onChange={(e)=>e.target.value}
                required 
                />
            <input 
                type='url'
                placeholder='Feed URL'
                value={url}
                onChange={(e)=>setUrl(e.target.value)}
                required
                />
            <button type='submit'>Add feed</button>
        </form>

    )
};

export default FeedForm;