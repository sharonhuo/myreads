import React, { Component } from "react";
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
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
    let bookList = this.props.books;
    console.log("before remove", bookList);
    //remove duplicated books that have the same Ids, otherwise
    //we will have warning
    bookList = bookList.filter((thing, index, self) => 
    self.findIndex(t => t.id === thing.id) === index);

    console.log("after remove", bookList);

    bookList.sort(sortBy('title'));

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
