import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';

import InvalidRoute from './components/InvalidRoute';
import BooksList from './components/BooksList';
import SearchBooks from './components/SearchBooks';
import * as BooksAPI from './api/BooksAPI';
import './App.css';

class App extends PureComponent {

  onChangeShelf = async (event, selectedBook) => {   
    return await BooksAPI.update(selectedBook, event.target.value);
  }

  render() {
    
    return (
      <div className="app">
          <Switch>

            <Route exact path='/' render={() => (
              <BooksList
                onChangeShelf={this.onChangeShelf}
              />
            )} />

            <Route path='/search' render={() => (
              <SearchBooks onChangeShelf={this.onChangeShelf}/>
            )} />

            <Route component={InvalidRoute} />

          </Switch>
      </div>
    );
  }
}

export default App;
