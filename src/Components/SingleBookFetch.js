import React from "react";
import noCoverImage from '../icons/no-cover-image.png';

// stateless component for rendering only
const SingleBookFetch = (props) => {
    const { book,updateShelf} = props;
    return (
      <li>
        <div className="book">
          <div className="book-top">
              <div
                className="book-cover"
                style={{
                  width: 128,
                  height: 193,
                 backgroundImage:`url(${book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : noCoverImage})`}}>
                </div>
  
            {/* SELECT FORM INPUT */}
            <div className="book-shelf-changer">
              <select 
              value={book.shelf ? book.shelf : "none"}
              onChange={(e) => updateShelf(book, e.target.value)}> 
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
            {/* book-shelf-changer */}
          </div>
          {/* //book-top */}

          {/* GENERATES BOOK TITLE */}
          <div className="book-title">{book.title ? book.title : null}</div>
          {book.authors &&
            book.authors.map((author, index) => (
              <div key={index} className="book-authors">
                {author}
              </div>
            ))}
        </div>
      </li>
    );
}

export default SingleBookFetch;
