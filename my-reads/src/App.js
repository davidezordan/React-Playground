import React from 'react';
import { Route, Switch } from 'react-router-dom';

import InvalidRoute from './components/InvalidRoute';
import BooksList from './components/BooksList';
import SearchBooks from './components/SearchBooks';
import * as BooksAPI from './api/BooksAPI';
import './App.css';

const App = () => {
  const onChangeShelf = async (event, selectedBook) => {
    return await BooksAPI.update(selectedBook, event.target.value);
  }

  return (
    <div className="app">
        <Switch>

          <Route exact path='/' render={() => (
            <BooksList
              onChangeShelf={onChangeShelf}
            />
          )} />

          <Route path='/search' render={() => (
            <SearchBooks onChangeShelf={onChangeShelf}/>
          )} />

          <Route component={InvalidRoute} />

        </Switch>
    </div>
  );

}

export default App;
