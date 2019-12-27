import React from 'react';
import PropTypes from 'prop-types';

import Book from './Book';

const BookShelf = ({ books, title, onChangeShelf }) => (
  <div className="bookshelf">

    <h2 className="bookshelf-title">{title}</h2>

    <div className="bookshelf-books">
      <ol className="books-grid">
        {books && books.length > 0
          ? books
            .map((b) => (<li key={b.id}><Book book={b} onChangeShelf={onChangeShelf} /></li>))
          : <h3>No books available</h3>}
      </ol>
    </div>

  </div>
);

BookShelf.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  books: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  onChangeShelf: PropTypes.func.isRequired,
};

export default BookShelf;
