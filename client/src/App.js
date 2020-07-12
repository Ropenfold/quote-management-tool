import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import QuoteList from './components/quotes/QuoteList';
import QuoteInfo from './components/quotes/QuoteInfo';
import QuoteAdd from './components/quotes/QuoteAdd';
import QuoteEdit from './components/quotes/QuoteEdit';

function App() {
  return (
    <div className="App">
      <Router>
      <Navigation />
      <div className="container">
        <Main />
      </div>
      </Router>
    </div>
  );
}

function Navigation() {
  return( 
    <nav className="navbar avbar-expand-lg navbar-dark bg-dark mb-4">
    <div className="container">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/">Home</NavLink></li>
        <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="quotes">Quotes</NavLink></li>
      </ul>
    </div>
    </nav>
  );
}

function Main() {
  return(
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/quotes" component={QuoteList}/>
      <Route exact path="/quotes/new" component={QuoteAdd}/>
      <Route exact path="/quotes/:_id" component={QuoteInfo}/>
      <Route exact path="/quotes/:_id/edit" component={QuoteEdit}/>
    </Switch>
  )
}

export default App;
