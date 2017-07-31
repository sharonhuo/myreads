import React, { Component } from "react";
import { Link } from "react-router-dom";
import ListBooks from "./ListBooks";

/**
* @description Represents a book
* @constructor
* @param {string} term - The input serach string
*/
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { term: "" };
  }

  onInputChange(term) {
    this.setState({ term });
    this.props.onSearchTermChange(term);
  }

  cleanSeachResult() {
    this.props.cleanSearchResult();
  }

  changeShelf = (toShelf, book) => {
    if (this.props.onChangeShelf) {
      this.props.onChangeShelf(toShelf, book);
    }
  }

  render() {
    console.log("search term===", this.state);
    const { books } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
           <Link className="close-search" to="/"  onClick={this.cleanSeachResult}>Back</Link>
           <div className="search-books-input-wrapper">
             <input
               value={this.state.term}
               placeholder='Search by title or author'
               onChange={event => this.onInputChange(event.target.value)}
             />
           </div>
        </div>
        <div className="search-books-results">
            <ol className="books-grid">
            {books !== undefined && books.length > 0 &&
              <ListBooks
                books={books}
                onChangeShelf={this.changeShelf}
              />
            }
          </ol>
        </div>
      </div>

    );
  }

}

export default SearchBar;
