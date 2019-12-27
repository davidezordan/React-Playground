import React from 'react';
import PropTypes from 'prop-types';

const getBookCoverStyle = (book) => (book && book.imageLinks && book.imageLinks.smallThumbnail
  ? { width: 128, height: 193, backgroundImage: `url("${book.imageLinks.smallThumbnail}")` }
  : { width: 128, height: 193 });

const Book = ({ book, onChangeShelf }) => (
  <div className="book">
    <div className="book-top">
      <div className="book-cover" style={getBookCoverStyle(book)} />
      <div className="book-shelf-changer">
        <select value={book.shelf} onChange={(event) => { onChangeShelf(event, book); }}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    </div>
    <div className="book-title">{book && book.title}</div>
    <div className="book-authors">{book && book.authors && book.authors.join(', ')}</div>
  </div>
);

Book.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  book: PropTypes.object.isRequired,
  onChangeShelf: PropTypes.func.isRequired,
};

export default Book;
