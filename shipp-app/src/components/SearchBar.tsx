import React, { FC, useState } from 'react';
import { Input, Button  } from 'antd';

interface Isearcher {
    searcher: (e: string) => void
}
// search component
const SearchBar:FC<Isearcher> = (props:Isearcher)=> {
    const [reponame, setRepoName] = useState('')
    return (
        <>
            <Input placeholder="search repo" onChange={(e)=>setRepoName(e.target.value)} />
            <Button type="primary" onClick={(e)=>props.searcher(reponame)}>Search repos</Button>
        </>
    )
};

export default SearchBar