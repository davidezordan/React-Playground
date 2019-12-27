import React from 'react';
import PropTypes from 'prop-types';

import Book from './Book';

const BooksGrid = ({ books, onChangeShelf }) => (

  <ol className="books-grid">

    {books && books.length > 0 && books.map((book) => (
      <li key={book.id}>
        <Book book={book} onChangeShelf={onChangeShelf} />
      </li>
    ))}

  </ol>

);

BooksGrid.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  books: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired,
};

export default BooksGrid;
