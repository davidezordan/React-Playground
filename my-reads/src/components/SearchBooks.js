import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { DebounceInput } from 'react-debounce-input';

import * as BooksAPI from '../api/BooksAPI';
import BooksGrid from './BooksGrid';
import Spinner from './Spinner';

const EMPTY_BOOKS = [];
const SHELF_NONE_ID = 'none';

class SearchBooks extends PureComponent {
    state = { searchTerm: '', isLoading: false, books: EMPTY_BOOKS };

    onChangeShelf = async (event, book) => {
        const { onChangeShelf } = this.props;
        const { books } = this.state;
        const shelf = event.target.value;

        this.showSpinner(true);
        try {
            await onChangeShelf(event, book);
            this.setState( { books: books.map(b => 
                                b.id === book.id ? Object.assign({}, b, { shelf : shelf }) : b)});    
        } finally {
            this.showSpinner(false);
        }
    }

    searchTermUpdated = async newTerm => {
        const { isLoading } =  this.state;

        this.setState({ books: EMPTY_BOOKS });

        if (newTerm && newTerm.length > 0 && !isLoading) {
            this.showSpinner(true);

            try {
                const books = await BooksAPI.search(newTerm);

                if (books && books.length > 0) {
                    const newBooks = books.filter(b => 
                        b.imageLinks && b.imageLinks.smallThumbnail && b.authors && b.authors.length > 0);
  
                  await this.updateBooksShelves(newBooks);
                }
            } finally {
                this.showSpinner(false);
            }
        }
    }

    showSpinner = isSpinnerRequired => {
        this.setState({ isLoading: isSpinnerRequired });
    }

    updateBooksShelves = async (books) => {
        const shelveBooks = await BooksAPI.getAll();

        const updatedBooks = books
            .map(book => shelveBooks.some(sb => sb.id === book.id) ? shelveBooks.find(sb => sb.id === book.id) :
                         Object.assign({}, book, { shelf: SHELF_NONE_ID }));

        this.setState( { books: updatedBooks });
    }

    render() {
        const { books, isLoading } = this.state;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/'>
                        <button className="close-search">Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        <DebounceInput
                            placeholder="Search by title or author" 
                            minLength={1}
                            debounceTimeout={300}
                            onChange={ev=>{this.searchTermUpdated(ev.target.value)}} />
                    </div>
                </div>
                <div className="search-books-results">
                    {isLoading ? <Spinner /> : <BooksGrid books={books} onChangeShelf={this.onChangeShelf} />}
                </div>
            </div>
        )
    }
}

SearchBooks.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    onChangeShelf: PropTypes.func.isRequired,
  };

export default SearchBooks;
