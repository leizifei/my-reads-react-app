import React, { Component } from "react";
import { Link } from "react-router-dom";
import SingleBookFetch from "./SingleBookFetch";
import * as BooksAPI from "../BooksAPI";

class SearchBooks extends Component {

  state = {
    searchResult: [],
    newBooks: [],
    searchError: false
  }


  // function to search book through the API
  onSearch = (e) => {
        const searchQuery = e.target.value;
        if(searchQuery) {
            BooksAPI
            .search(searchQuery)
            .then((resultBooks)=>{
                if(!resultBooks || resultBooks.hasOwnProperty('error')){
                    this.setState({searchResult: [], searchError: true })
                } else {
                    this.setState({searchResult: resultBooks, searchError:false})
                    this.syncBookShelfProperty()
                }
            })
        } else {
            this.setState({searchResult: [] })
        }
    }

   // Sync search result book shelf property with current shelf books
    syncBookShelfProperty = () => {
        const books = this.state.newBooks;
        const searchResult = this.state.searchResult
        if(searchResult.length > 0) {
                books.forEach((book) => {
                    searchResult.forEach((searchResultBook) =>{
                        if(book.id === searchResultBook.id) {
                            searchResultBook.shelf = book.shelf
                        }
                    })
                })
        }
        this.setState({searchResult: searchResult})
    }


    // update shelf when a book changes shelf
  updateShelf = (book, shelf) => {
    BooksAPI.update(book,shelf).then(updated => {
      // change shelf property of book to a new select shelf category
      book.shelf = shelf;
      // filter out book and push to array
      let updateBooks = this.state.newBooks.filter(
        resultBook => resultBook.id !== book.id);
      updateBooks.push(book);
      // set the state with the new books
      this.setState({ newBooks: updateBooks });
    });
  };

  render() {
    const {searchResult,searchError} = this.state;   
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              className="search-books-results"
              placeholder="Search books by title or author"
              onChange={this.onSearch}
            />
          </div>
        </div>
        {/* search-books-bar */}

        <div className="search-books-results">
          {searchResult.length > 0 && (
            <div>
              <div>
                <h3>Search has returned {searchResult.length} books </h3>
              </div>
              <ol className="books-grid">
                {searchResult.map((book) => (
                  <SingleBookFetch
                    book={book}
                    key={book.id}
                    updateShelf={this.updateShelf}
                  />
                ))}
              </ol>
            </div>
          )} 

          {searchError && (
            <div>
                <h3>No books found. Please try again!</h3>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SearchBooks;
