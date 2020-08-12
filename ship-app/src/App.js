
import React from 'react';
import './App.css';
import { useQuery, gql} from '@apollo/client';


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

function App() {
  const { loading, error, data } = useQuery(GET_REPOS, {
    variables: {"repoQuery": "react"}
  });
  if (loading) return <p >Loading...</p>;
  if (error) return <p> Error:)</p>;

  return (
    <div className="App">
      {console.dir(data)}
      <header className="App-header">
        {data.search.edges.map((elem)=>{
          return <p key="somekey">{elem.node.forks.totalCount}</p>
        })}
      </header>
    </div>
  );
}

export default App;
