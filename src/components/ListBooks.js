import React, { Component } from "react";
import PropTypes from 'prop-types'
import BookItem from "./BookItem";

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  changeShelf = (toShelf, book) => {
    if (this.props.onChangeShelf) {
      this.props.onChangeShelf(toShelf, book);
    }
  }

  render () {
    const bookList = this.props.books;
    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {bookList.map((item) => (
              <BookItem
                book={item}
                key={item.id}
                onChangeShelf={this.changeShelf}
              />
            ))
          }
        </ol>
      </div>
  )}
}

export default ListBooks;
