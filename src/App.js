import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Link } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import ListBooks from  "./components/ListBooks";
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends Component {
  state = {
    currentlyReadingList: [],
    wantToReadList: [],
    readList: [],
    searchResultList: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      let currentlyReadingList = books.filter((book) => book.shelf === 'currentlyReading');
      let wantToReadList = books.filter((book) => book.shelf === 'wantToRead');
      let readList = books.filter((book) => book.shelf === 'read');
      this.setState({
        currentlyReadingList: currentlyReadingList ,
        wantToReadList: wantToReadList,
        readList: readList})
    })
  }

  /**
  * @description Set the state when moving the book
  * @param {string} toShelf - The shelf that the book is going to be moved to
  * @param {object} book - The book that is currectly moving
  */
  changeShelf = (toShelf, book) => {
    const orgBookShelf = book.shelf;
    const orgBook = book;
    orgBook.shelf = toShelf;

    //update the backend server and set the state for displaying
    BooksAPI.update(book, toShelf).then((book) => {
      this.setState((state) => ({
        currentlyReadingList: toShelf === 'currentlyReading' ?
        state.currentlyReadingList.concat([ orgBook ]) :
        (orgBookShelf === 'currentlyReading' ? state.currentlyReadingList.filter((c) => c.id !== orgBook.id) : state.currentlyReadingList),

        wantToReadList: toShelf === 'wantToRead' ?
        state.wantToReadList.concat([ orgBook ]) :
        (orgBookShelf === 'wantToRead' ? state.wantToReadList.filter((c) => c.id !== orgBook.id) : state.wantToReadList),

        readList: toShelf === 'read' ?
        state.readList.concat([ orgBook ]) :
        (orgBookShelf=== 'read' ? state.readList.filter((c) => c.id !== orgBook.id) : state.readList)
      }))
    })
  }

  searchBooks = (term) => {
    const booksOnMyShelf = this.state.currentlyReadingList.concat(this.state.wantToReadList, this.state.readList);
    BooksAPI.search(term, 20).then((data) => {

    //Since the search result is not based on the token, it can come from
    //differnt end points, so we need to reset the book shelf to "none" when
    //if the book is not on my own book shelf
    if (data !== null && data !== undefined && data.length > 0) {
      data.map((item) => {
        const bookOnSelf = booksOnMyShelf.filter((c) => c.id === item.id) ;
        //If the book is not in my book shelf, set the shelf to null
        if (bookOnSelf.length === 0) {
          item.shelf = '';
        } else {
          //otherwise set it to the same as my shelf
          item.shelf = bookOnSelf[0].shelf;
        }
      })
    }

    this.setState((state) => ({
      currentlyReadingList: state.currentlyReadingList,
      wantToReadList: state.wantToReadList,
      readList: state.readList,
      searchResultList: data
      }))
    });
  }

/*
*Remove the previous search result
*TODO: Keep the previous search term and result
*/
  cleanSearchResult() {
    this.setState({
      currentlyReadingList: this.state.currentlyReadingList ,
      wantToReadList: this.state.wantToReadList,
      readList: this.state.readList,
      searchResultList: []})
  }

  render() {
    const { currentlyReadingList, wantToReadList, readList, searchResultList} = this.state;
    console.log('searchResultList', searchResultList);
    const shelves = [
      {title: "Currently Reading", list: currentlyReadingList},
      {title: "Want to Read", list: wantToReadList},
      {title: "Read", list: readList}
    ];

    return (
      <div className="app">
        <Route exact path="/" render={() => (
        <div className="list-books">
          <div className="list-books-title">
           <h1>MyReads</h1>
         </div>
         <div className="list-books-content">
           <div>
              {shelves.map((shelf) => (
                <div className="bookshelf" key={shelf.title}>
                  <h2 className="bookshelf-title">{shelf.title}</h2>
                  <ListBooks
                    books={shelf.list}
                    onChangeShelf={this.changeShelf}
                  />
                </div>
                )
              )}
           </div>
         </div>
        <div className="open-search">
          <Link
             to='/search'
             className='search-books'
          >Add book</Link>
        </div>
      </div>
      )
    }/>
    <Route path='/search' render={({ history }) => (
      <SearchBar
         className='search-books-bar'
         books={this.state.searchResultList}
         onSearchTermChange={this.searchBooks}
         onChangeShelf={this.changeShelf}
         cleanSeachResult={this.cleanSeachResult}
      />
    )}/>
  </div>
  )
}
}
export default BooksApp
