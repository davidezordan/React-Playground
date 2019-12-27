import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import BookShelf from './BookShelf';
import Spinner from './Spinner';
import * as BooksAPI from '../api/BooksAPI';

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

    const shelves = [
      { title: 'Currently Reading', key: 'currentlyReading' },
      { title: 'Want To Read', key: 'wantToRead' },
      { title: 'Read', key: 'read' },
    ];

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
            {shelves.map(shelf => (
              <BookShelf 
                books={books.filter((book) => book.shelf.trim() === shelf.key)} 
                title={shelf.title} onChangeShelf={this.onChangeShelf} />
            ))}
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
