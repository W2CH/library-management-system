import {validISBN} from '../validateISBN.js';
import {addBookToTable} from '../addBookDataToTable.js'

export default function searchBook(){
    document.getElementById("add-table").hidden = true;

    // TODO: Check if the search table exists.
    if(document.getElementById("search-table")){
        // TODO: Each time find-book button gets hit, we need to clear the table. so delete search table.
        const oldSearchResult = document.getElementById("search-table");
        oldSearchResult.remove();
    }

    // TODO: Now create the table again to add the new results.
    createATable();

    // Format book title and author that was passed in
    const authorAndTitle = formatTitleAndAuthor();
    var bookAuthor = authorAndTitle.author
    var bookTitle = authorAndTitle.bookTitle

    // TODO: Find book using ISBN
    const ISBN = document.getElementById("find-book-ISBN").value;
    if(ISBN !== ""){
        if(!validISBN(ISBN)){
            return false;
        }
        // Check if the book exists
        if(!localStorage.getItem(ISBN)){
            document.getElementById("search-status").innerHTML = "This book does not exist.";
            return false;
        }

        // TODO: Add book to the search result table.
        addBookToTable("search-results", ISBN);
        console.log("Book was found!");
        document.getElementById("search-status").innerHTML = "Search results for " + bookTitle + ":";
        return true;
    }
    // TODO: Find book using only the book title and author name. (THIS DOES NOT WORK!! LOOK INTO IT!!)
    // 1.Iterate through each key in local storage to get the book data as a JSON
    for(let i = 0; i < localStorage.length; i++){
        // Get the ISBN
        const ISBN = localStorage.key(i);

        // 2.Parse book data into a map in JS
        const stringBookInfo = localStorage.getItem(ISBN);
        let bookInfoArray = JSON.parse(stringBookInfo);
        let retrievedBook = new Map(bookInfoArray);

        // 3. If the current book's author or bookTitle are the same as the book info
        // the user passed in, then add that book to the search table.
        if(retrievedBook.get("bookTitle") === bookTitle || retrievedBook.get("author") === bookAuthor){
            addBookToTable("search-results", ISBN);
        }
    }
    const searchTableRows = document.getElementById("search-results");
    if(searchTableRows.rows.length === 0){
        console.log("Book does not exist!");
        document.getElementById("search-status").innerHTML = "Book does not exist!";
        return;
    }
    console.log("Book was found!");
    document.getElementById("search-status").innerHTML = "Search results for " + bookTitle + ":";
    return false;
}

function createATable(){
    const searchTable = document.createElement("table");
    const searchTableBody = document.createElement("tbody");
    const tableHead = document.createElement("thead");
    const initialRow = document.createElement("tr");
    const bookTitleColumn = document.createElement("th");
    const authorColumn = document.createElement("th");
    const ISBNColumn = document.createElement("th");
    const quantityColumn = document.createElement("th");
    const editColumn = document.createElement("th");

    searchTable.id = "search-table";
    searchTableBody.id = "search-results";

    // TODO: Assigning column names
    bookTitleColumn.textContent = "Book Title";
    authorColumn.textContent = "Author";
    ISBNColumn.textContent = "ISBN";
    quantityColumn.textContent = "Quantity";
    editColumn.textContent = "Edit";

    document.body.appendChild(searchTable);

    // Add all children to table element.
    searchTable.appendChild(tableHead);
    searchTable.appendChild(searchTableBody);

    // Add all children to table head.
    tableHead.appendChild(initialRow);

    // Add all children to initial row
    initialRow.appendChild(bookTitleColumn);
    initialRow.appendChild(authorColumn);
    initialRow.appendChild(ISBNColumn);
    initialRow.appendChild(quantityColumn);
    initialRow.appendChild(editColumn);
}

function formatTitleAndAuthor(){
    var bookTitle = document.getElementById("find-book-title").value;
    var author = document.getElementById("find-book-author").value;

    // Remove all white spaces
    bookTitle = bookTitle.replace(" ", "");
    author = author.replace(" ", "");

    // Lowercase both strings
    bookTitle = bookTitle.toLowerCase();
    author = author.toLowerCase();
    return {bookTitle, author};
}