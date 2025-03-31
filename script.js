import addBook from "./addingBook/addBook.js";
import searchBook from "./searchingBook/bookSearch.js";
import {addBookToTable} from './addBookDataToTable.js';

export const books = new Map();

// TODO: Display all book data from local storage back to the table when someone hit refresh
window.onload = function(){
    for(let i = 0; i < localStorage.length; i++){
        // Get the ISBN
        const ISBN = localStorage.key(i);

        // Unmarshall book information
        const stringBookInfo = localStorage.getItem(ISBN);
        let bookInfoArray = JSON.parse(stringBookInfo);
        let retrievedBook = new Map(bookInfoArray);

        // Add current book to table
        addBookToTable("book-table", ISBN);
    }
}
document.addEventListener("DOMContentLoaded",function(){
    const addingBookForm = document.getElementById("book-info");
    const searchingBookForm = document.getElementById("get-book");

    // Add an event listener that calls addingBook function from searchingBook module
    addingBookForm.addEventListener("submit",function(event){
        // Prevents submission to a server.
        event.preventDefault();

        var bookWasAdded = addBook();
        if(bookWasAdded){
            // Remove the book info that was passed in after adding the book.
            addingBookForm.reset();
        }
    })
    // Event listen that calls searchBook function from searchingBook module.
    searchingBookForm.addEventListener("submit", function(event){
        event.preventDefault();
        var bookFound = searchBook();
        if(bookFound){
            searchingBookForm.reset();
        }
    })
})