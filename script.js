import addBook from "./addingBook/addBook.js";
import searchBook from "./searchingBook/bookSearch.js";
import {addBookToTable} from './addBookDataToTable.js';
import editBook from "./editBook/editBook.js";

// TODO: Display all book data from local storage back to the table when someone hit refresh
window.onload = function(){
    // TODO: Hide the other views
    document.getElementById("add-view").hidden = true;
    document.getElementById("search-view").hidden = true;
    document.getElementById("return-main").hidden = true;
    document.getElementById("add-status").hidden = true;
    document.getElementById("search-status").hidden = true;
    document.getElementById("edit-view").hidden = true;
    refreshTable();
}
document.addEventListener("DOMContentLoaded",function(){
    const addingBookForm = document.getElementById("book-info");
    const searchingBookForm = document.getElementById("get-book");
    const addBookButton = document.getElementById("add-button");
    const mainViewButton = document.getElementById("return-main");
    const searchBookButton = document.getElementById("search-button");

    mainViewButton.addEventListener("click", function(){
        // Check if we are in the add page
        if(!document.getElementById("add-view").hidden){
            mainViewButton.hidden = true;
            document.getElementById("add-status").hidden = true;
            document.getElementById("add-view").hidden = true;
            addingBookForm.reset();
            document.getElementById("main-view").hidden = false;
        }
        // Check if we are in the search page
        if(!document.getElementById("search-view").hidden){
            // Set search table to empty
            document.getElementById("search-table").innerHTML = "";
            mainViewButton.hidden = true;
            document.getElementById("search-view").hidden = true;
            searchingBookForm.reset();
            document.getElementById("main-view").hidden = false;
        }
        // Check if we are in the edit view page
        if(!document.getElementById("edit-view").hidden){
            document.getElementById("edit-view").hidden = true;
            document.getElementById("return-main").hidden = true;
            document.getElementById("main-view").hidden = false;
        }
    })

    addBookButton.addEventListener("click", function(){
        document.getElementById("main-view").hidden = true;
        document.getElementById("add-view").hidden = false;
        document.getElementById("return-main").hidden = false;
    })
    searchBookButton.addEventListener("click", function(){
        document.getElementById("main-view").hidden = true;
        document.getElementById("search-view").hidden = false;
        document.getElementById("return-main").hidden = false;
    })

    // Add an event listener that calls addingBook function from searchingBook module
    addingBookForm.addEventListener("submit",function(event){
        // Prevents submission to a server.
        event.preventDefault();

        var bookWasAdded = addBook();
        if(bookWasAdded){
            // Remove the book info that was passed in after adding the book.
            addingBookForm.reset();

            // TODO: Return back to main view.
            document.getElementById("add-view").hidden = true;
            document.getElementById("main-view").hidden = false;
            document.getElementById("return-main").hidden = true;
            document.getElementById("add-status").hidden = false;

            document.getElementById("add-status").textContent = "Book has been added!";
            // Have this message disappear after 3 seconds.
            setTimeout(()=>{
                document.getElementById("add-status").style.display = "none"
            }, 3000);
            return;
        }
        document.getElementById("add-status").hidden = false;
        document.getElementById("add-status").textContent = "Book was not added!";
        setTimeout(()=>{
            document.getElementById("add-status").style.display = "none"
        }, 3000);
    })

    // Event listen that calls searchBook function from searchingBook module.
    searchingBookForm.addEventListener("submit", function(event){
        event.preventDefault();
        const bookFound = searchBook();
        if(bookFound){
            document.getElementById("search-status").hidden = false;
            document.getElementById("search-status").textContent = "Book was found!";
            setTimeout(()=>{
                document.getElementById("search-status").style.display = "none"
            }, 3000);
            searchingBookForm.reset();
        }
    })

    document.getElementById("book-table").addEventListener("click", function (event) {
        const clickedElement = event.target;

        // If the clicked thing is an edit button
        if (clickedElement.classList.contains("edit-button")) {
            const isbn = clickedElement.dataset.isbn;

            // Build the edit form and show edit view
            editBook(isbn);

            // Add the form listener right after the form is created
            const form = document.getElementById("edit-form");

            form.addEventListener("submit", function (event) {
                event.preventDefault();

                const title = document.getElementById("edit-title").value;
                const author = document.getElementById("edit-author").value;
                const quantity = document.getElementById("edit-quantity").value;

                const bookMap = new Map(JSON.parse(localStorage.getItem(isbn)));
                bookMap.set("userBookTitleInput", title);
                bookMap.set("userAuthorInput", author);
                bookMap.set("quantity", quantity);

                localStorage.setItem(isbn, JSON.stringify(Array.from(bookMap.entries())));

                document.getElementById("edit-view").hidden = true;
                document.getElementById("return-main").hidden = true;
                document.getElementById("main-view").hidden = false;

                document.getElementById("book-table").innerHTML = "";
                refreshTable();
            });
        }
    });
})

function refreshTable(){

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