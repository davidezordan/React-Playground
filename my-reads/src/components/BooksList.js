import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import BookShelf from './BookShelf';
import Spinner from './Spinner';
import * as BooksAPI from '../api/BooksAPI';

const SHELF_READ = 'read'.toLowerCase();
const SHELF_WANT_TO_READ = 'wantToRead'.toLowerCase();
const SHELF_CURRENTLY_READING = 'currentlyReading'.toLowerCase();

class BooksList extends PureComponent {
  state = {
    books: [],
    isLoading: false,
  };

  onChangeShelf = async (event, book) => {
    const { onChangeShelf } = this.props;

    this.showSpinner(true);
    try {
      await onChangeShelf(event, book);
      const modifiedBooks = await BooksAPI.getAll();
      this.setState({ books: modifiedBooks });
    } finally {
      this.showSpinner(false);
    }
  }

  async componentDidMount() {
    try {
      this.showSpinner(true);
      const books = await BooksAPI.getAll();
      this.setState({ books: books });
    } finally {
      this.showSpinner(false);
    }
  }

  showSpinner = isSpinnerRequired => {
    this.setState({ isLoading: isSpinnerRequired });
  }

  render() {
    const { isLoading, books } = this.state;

    return (
      isLoading ? <Spinner /> :

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
            <BookShelf 
                books={books.filter((b) => b.shelf.toLowerCase().trim() === SHELF_CURRENTLY_READING)} 
                title="Currently Reading" onChangeShelf={this.onChangeShelf} />
            <BookShelf 
                books={books.filter((b) => b.shelf.toLowerCase().trim() === SHELF_WANT_TO_READ)} 
                title="Want to Read" onChangeShelf={this.onChangeShelf} />
            <BookShelf 
                books={books.filter((b) => b.shelf.toLowerCase().trim() === SHELF_READ)} 
                title="Read" onChangeShelf={this.onChangeShelf} />
          </div>
        </div>

      </div>
    );
  }
}

BooksList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  onChangeShelf: PropTypes.func.isRequired,
};

export default BooksList;
