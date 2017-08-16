import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Typeahead} from 'react-bootstrap-typeahead';

import ListBooks from "./ListBooks";

/**
* @description Represents a book
* @constructor
* @param {string} term - The input serach string
*/
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.onInputChange=this.onInputChange.bind(this)
    this.state = { term: ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'History', 'History', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Program Javascript', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'] };
  }

  onInputChange(term) {
    console.log('term', term);
    this.setState({ term });
    //BooksAPI returns 403 if entered a search string then using backspace to
    //clean up the input string
    if (term.length > 0) {
      this.props.onSearchTermChange(term[0]);
   }
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
    const { books } = this.props;

    return (
      <div>
        <div className="input-group">
          <span className="input-group-addon" id="sizing-addon2">
           <Link to="/"  onClick={this.cleanSeachResult}>Back</Link></span>
             <Typeahead
              onChange={this.onInputChange}
              options={this.state.term}
              />
        </div>
      
           {/*<div className="search-books-input-wrapper">
             <input
               value={this.state.term}
               placeholder='Search by title or author'
               onChange={event => this.onInputChange(event.target.value)}
             />*/}
  
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
