import React from 'react'
import { Todo } from '../../../typing';

type PageProps = {
    params:{
        searchTerm:string;
    };
};

const Search = async (searchTerm:string)=>{

    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${searchTerm}`)
    const result:Todo = await res.json();
    return result;
}


async function SearchTermPage({params:{searchTerm}}: PageProps) {

    const searchResults = await Search(searchTerm)

  return (
   searchResults.title? <div>Title: {searchResults.title}</div>
                      : <h1>sorry not found</h1>
  )
}

export default SearchTermPage