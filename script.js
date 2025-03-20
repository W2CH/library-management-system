import addBook from "./addingBook/addBook.js";
import searchBook from "./searchingBook/bookSearch.js";

export const books = new Map();

document.addEventListener("DOMContentLoaded",function(){
    const addingBookForm = document.getElementById("book-info");
    const searchingBookForm = document.getElementById("get-book")

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