import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import AllPosts from "./components/AllPosts";

const client = new ApolloClient({
  link: new HttpLink({ 
    uri: "/graphql", 
    credentials: 'same-origin'
  }),
  cache: new InMemoryCache()
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div>
            <Nav/>
            <Route exact path="/" component={Home}/>
            <Route path="/allposts" component={AllPosts}/>
            <Route exact path="/about" component={About}/>
            <Footer/>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
