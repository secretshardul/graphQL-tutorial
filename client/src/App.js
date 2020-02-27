import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

//components
import BookList from './components/BookList';
import AddBook from './components/AddBook';

//setup apollo client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});
function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>NetNinja reading list</h1>
        <BookList/>
        <AddBook/>
      </div>
    </ApolloProvider>
  );
}

export default App;
