import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import BookShelf from './BookShelf';
import Spinner from './Spinner';
import * as BooksAPI from '../api/BooksAPI';

const shelves = [
  { title: 'Currently Reading', key: 'currentlyReading' },
  { title: 'Want To Read', key: 'wantToRead' },
  { title: 'Read', key: 'read' },
];

const BooksList = ({ onChangeShelf }) => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const showSpinner = (isSpinnerRequired) => {
    setIsLoading(isSpinnerRequired);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        showSpinner(true);
        const newBooks = await BooksAPI.getAll();
        setBooks(newBooks);
      } finally {
        showSpinner(false);
      }
    };

    fetchData();
  }, []);

  const onChangeShelfEvent = async (event, book) => {
    showSpinner(true);
    try {
      await onChangeShelf(event, book);
      const modifiedBooks = await BooksAPI.getAll();
      setBooks(modifiedBooks);
    } finally {
      showSpinner(false);
    }
  };

  return (
    isLoading ? <Spinner />

      : (
        <div>

          <Link to="/search">
            <div className="open-search">
              <button type="submit">Add a book</button>
            </div>
          </Link>

          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <div className="list-books-content">
              {shelves.map((shelf) => (
                <BookShelf
                  books={books.filter((book) => book.shelf.trim() === shelf.key)}
                  title={shelf.title}
                  onChangeShelf={onChangeShelfEvent}
                  key={shelf.key}
                />
              ))}
            </div>
          </div>

        </div>
      )
  );
};

BooksList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  onChangeShelf: PropTypes.func.isRequired,
};

export default BooksList;
