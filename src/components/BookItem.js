import React, { Component } from 'react';
import PropTypes from 'prop-types'
import ControlItem from './ControlItem';

/**
* @description Represents a book
* @param {string} title - The title of the book
* @param {string} authors - The authors of the book
*/

class BookItem extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  changeShelf = (toShelf, book) => {
    if (this.props.onChangeShelf) {
      this.props.onChangeShelf(toShelf, book);
    }
  }

  render() {
    const book = this.props.book;
    const imageUrl = book.imageLinks.thumbnail;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{width: 128, height: 193,
                backgroundImage: `url(${imageUrl})` }}>
            </div>
            <ControlItem
              currentBook={book}
              onChangeShelf={this.changeShelf}
            />
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
        </div>
      </li>
    )
  }
}

export default BookItem;
