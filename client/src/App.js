import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Home from './pages/Home';
import Order from './pages/Order';
import NotFound from './pages/NotFound';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        customers: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        orders: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const customer = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={customer}>
        <Router>
          <Header />
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/orders/:id' element={<Order />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
