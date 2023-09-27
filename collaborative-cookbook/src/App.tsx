import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import './App.css';
import ResponsiveAppBar from './navigation/Nav';

function App() {
  return (
    <ApolloProvider client={client}>
    <React.Fragment>
      <ResponsiveAppBar />
    </React.Fragment>
    </ApolloProvider>
  );
}

export default App;
