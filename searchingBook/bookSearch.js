import {books} from '../script.js';
import {validISBN} from '../validateISBN.js';

export default function searchBook(){

    console.log(books);
    // Hide the table with all the books
    document.getElementById("add-table").hidden = true;

    // TODO: Create a new table.
    const searchTable = document.createElement("table");
    const searchTableBody = document.createElement("tbody");
    const tableHead = document.createElement("thead");
    const initialRow = document.createElement("tr");
    const bookTitleColumn = document.createElement("th");
    const authorColumn = document.createElement("th");
    const ISBNColumn = document.createElement("th");
    const quantityColumn = document.createElement("th");
    const editColumn = document.createElement("th");

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


    // TODO: Find book using ISBN
    const ISBN = document.getElementById("find-book-ISBN").value;
    if(ISBN !== ""){
        if(!validISBN(ISBN)){
            return false;
        }
        // Check if the book exists
        if(!books.has(ISBN)){
            document.getElementById("search-status").innerHTML = "This book does not exist.";
            return false;
        }

        // TODO: Add book to the search result table.
        addBook(ISBN, searchTableBody);
        console.log("Book was added!");
        document.getElementById("search-status").innerHTML = "Search results:";
        return true;
    }

    // TODO: Find book using only the book title and author name. THIS DOES NOT WORK!! LOOK INTO IT!!
    var bookTitle = document.getElementById("find-book-title");
    var bookAuthor = document.getElementById("find-book-author");

    for(const book of books.values()){
        if(book.get("author") === bookAuthor || book.get("bookTitle") === bookTitle){
            // TODO: Add book to the search result table.
            addBook(ISBN, searchTableBody);
            document.getElementById("search-status").innerHTML = "Search results:";
            console.log("Search results:");
            return true;
        }
    }
    console.log("Book does not exist!");
    document.getElementById("search-status").innerHTML = "Book does not exist!";
    return false;
}

function addBook(ISBN, searchTableBody){
    // This is creating a new row element.
    const newRow = document.createElement("tr");

    // This creates cells for the row we created.
    const bookTitle = document.createElement("td");
    const author = document.createElement("td");
    const tdISBN = document.createElement("td");
    const bookQuantity = document.createElement("td");
    const edit = document.createElement("td");

    // Creating a edit button
    const newEditButton = document.createElement("input");
    newEditButton.type = "button";
    newEditButton.value = "Edit";

    // Store book data to the table data elements
    bookTitle.textContent = books.get(ISBN).get("bookTitle");
    author.textContent = books.get(ISBN).get("author");
    tdISBN.textContent = ISBN;
    bookQuantity.textContent = books.get(ISBN).get("quantity");
    edit.appendChild(newEditButton);

    console.log(books.get(ISBN).get("bookTitle"));
    console.log(books.get(ISBN).get("author"));
    console.log(ISBN);
    console.log(books.get(ISBN).get("quantity"));

    // Set table row as the parent of all table data
    newRow.appendChild(bookTitle);
    newRow.appendChild(author);
    newRow.appendChild(tdISBN);
    newRow.appendChild(bookQuantity);
    newRow.appendChild(edit);

    searchTableBody.appendChild(newRow);
}