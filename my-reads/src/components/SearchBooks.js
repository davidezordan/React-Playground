import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { DebounceInput } from 'react-debounce-input';

import * as BooksAPI from '../api/BooksAPI';
import BooksGrid from './BooksGrid';
import Spinner from './Spinner';

const EMPTY_BOOKS = [];
const SHELF_NONE_ID = 'none';

const SearchBooks = ({ onChangeShelf }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState(EMPTY_BOOKS);

  const showSpinner = (isSpinnerRequired) => {
    setIsLoading(isSpinnerRequired);
  };

  const onChangeShelfEvent = async (event, book) => {
    const shelf = event.target.value;

    showSpinner(true);
    try {
      await onChangeShelf(event, book);
      setBooks(books.map((b) => (b.id === book.id ? ({ ...b, shelf }) : b)));
    } finally {
      showSpinner(false);
    }
  };

  const updateBooksShelves = async (newBooks) => {
    const shelveBooks = await BooksAPI.getAll();

    const updatedBooks = newBooks
      .map((book) => (shelveBooks.some((sb) => sb.id === book.id)
        ? shelveBooks.find((sb) => sb.id === book.id)
        : ({ ...book, shelf: SHELF_NONE_ID })));

    setBooks(updatedBooks);
  };

  const searchTermUpdated = async (newTerm) => {
    setBooks(EMPTY_BOOKS);

    if (newTerm && newTerm.length > 0 && !isLoading) {
      showSpinner(true);

      try {
        const searchBooks = await BooksAPI.search(newTerm);

        if (searchBooks && searchBooks.length > 0) {
          await updateBooksShelves(searchBooks);
        }
      } finally {
        showSpinner(false);
      }
    }
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/">
          <button type="button" className="close-search">Close</button>
        </Link>
        <div className="search-books-input-wrapper">
          <DebounceInput
            placeholder="Search by title or author"
            minLength={1}
            debounceTimeout={300}
            onChange={(ev) => { searchTermUpdated(ev.target.value); }}
          />
        </div>
      </div>
      <div className="search-books-results">
        {isLoading ? <Spinner /> : <BooksGrid books={books} onChangeShelf={onChangeShelfEvent} />}
      </div>
    </div>
  );
};

SearchBooks.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  onChangeShelf: PropTypes.func.isRequired,
};

export default SearchBooks;
