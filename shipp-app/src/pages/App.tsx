import React, {FC} from 'react';
import './App.css';
import { useQuery, gql } from '@apollo/client';

import TableComponent from './../components/TableComponent';
import SearchBar from './../components/SearchBar';
// query to get the list of repos from git hub
const GET_REPOS = gql`
   query repoSearch($repoQuery:String!)
          {
            search(query:$repoQuery,type:REPOSITORY, first:10) {
               repositoryCount
               edges {
                 node {
                   ... on Repository {
                     name     
                     url
                     stargazers{
                       totalCount
                     }
                    forks {
                      totalCount
                    }              
                   }
                 }
               }
             }
          }     
`;
// Root component
const  App:FC = () =>{
    const { loading, error, data, fetchMore  } = useQuery(GET_REPOS, {
        variables: {"repoQuery": "react"}
    });
    if (loading) return <p >Loading...</p>;
    if (error) return <p> Error:)</p>;
    // search click handler to request repo's by keyword entered in input filed
    const searcher = async (e:string) => {
      await fetchMore({
          variables: {"repoQuery": e},
          updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev;
              return Object.assign({}, {
                  search: fetchMoreResult.search
              });
          }
      });
  };

  return (
      <div className="App">
        <SearchBar searcher={searcher}/>
        <br />
        <TableComponent dataArg={data.search.edges} />
      </div>
  );
};

export default App;
