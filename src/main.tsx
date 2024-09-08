import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {Provider} from "react-redux";
import {ApolloClient,InMemoryCache,ApolloProvider} from "@apollo/client";
import {API_URL} from "./app/lib/API";
import store from "./app/lib/store";

const client = new ApolloClient({
  uri: `${API_URL}/graphql`,
  cache: new InMemoryCache(),
  credentials: "include",
 });
 
createRoot(document.getElementById('root')!).render(
 <StrictMode>
  <ApolloProvider client={client}>
   <Provider store={store}>
    <App />
   </Provider>
  </ApolloProvider>
 </StrictMode>
);