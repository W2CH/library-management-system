import {books} from '../script.js';
import {validISBN} from '../validateISBN.js';

export default function addBook(){

    // This just resets message.
    document.getElementById("add-status").innerHTML = ""

    // Get the values that the user passed in
    var ISBN = document.getElementById("ISBN").value;

    // Format book title and author that was passed in
    const authorAndTitle = formatTitleAndAuthor();
    var author = authorAndTitle.author
    var bookTitle = authorAndTitle.bookTitle

    // Converts the x at the end of an ISBN to uppercase.
    if(ISBN[9] === "x"){
        ISBN = ISBN.replace("x", "X");
    }

    // Figure out if the ISBN is valid
    if(!validISBN(ISBN)){
        console.log("book was not added!");
        return false;
    }
    // Figure out if ISBN already exists and if does, check if its an invalid duplicate.
    if(books.has(ISBN) && !duplicate(ISBN, bookTitle, author)){
        console.log("book was not added!");
        document.getElementById("add-status").innerHTML = "book was not added!";
        return false;
    }

    // Since this is a valid duplicate, just update quantity column.
    if(books.has(ISBN)){

        // Get the current quantity value of this book, cast it to int, update it, cast it back to string,
        // and update the quantity column in the table.
        var currentQuantity = Number(document.getElementById(ISBN).cells[3].innerHTML)
        currentQuantity++;
        document.getElementById(ISBN).cells[3].innerHTML = currentQuantity.toString();
        currentQuantity = books.get(ISBN).get("quantity");

        // Updates quantity value in the map
        books.get(ISBN).set("quantity", currentQuantity+1);
        document.getElementById("add-status").innerHTML = "Book has been added!";
        console.log(books);
        return true;
    }

    // Append the new book to the table

    // This is creating a new row element.
    const newRow = document.createElement("tr");

    // This creates cells for the row we created.
    const newBookTitle = document.createElement("td");
    const newAuthor = document.createElement("td");
    const newISBN = document.createElement("td");
    const bookQuantity = document.createElement("td");
    const edit = document.createElement("td");

    // Creating a edit button
    const newEditButton = document.createElement("input");
    newEditButton.type = "button";
    newEditButton.value = "Edit";

    // Store book data to the table data elements
    newBookTitle.textContent = document.getElementById("book-name").value;
    newAuthor.textContent = document.getElementById("author").value;
    newISBN.textContent = ISBN;
    bookQuantity.textContent = "1";
    edit.appendChild(newEditButton);

    // Set tr as the parent of td
    newRow.appendChild(newBookTitle);
    newRow.appendChild(newAuthor);
    newRow.appendChild(newISBN);
    newRow.appendChild(bookQuantity);
    newRow.appendChild(edit);

    // Set tbody as the parent of tr
    const bookTable = document.getElementById("book-table");
    bookTable.appendChild(newRow);

    // Give each new row a unique id using ISBN
    newRow.id = ISBN;

    // Store new book to our map.
    var book = new Map();
    book.set("author", author);
    book.set("bookTitle", bookTitle);
    book.set("ISBN", ISBN);
    book.set("quantity", 1);
    books.set(ISBN, book);

    document.getElementById("add-status").innerHTML = "Book has been added!";
    // var number = Number(document.getElementById(ISBN).cells[2].innerHTML);
    // console.log("Value of ISBN after convert:",number);
    return true;
}

function duplicate(ISBN, bookTitle, author){
    // Grab the existing book's information with the existing ISBN
    var existingBookTitle = books.get(ISBN).get("bookTitle");
    var existingAuthor = books.get(ISBN).get("author");

    // Check if the author and title of new book match the existing book
    if(author !== existingAuthor && bookTitle !== existingBookTitle){
        document.getElementById("add-status").innerHTML = "Title and Author do not match the existing book!";
        return false
    }
    // Check if only the author name is wrong.
    else if(author !== existingAuthor){
        document.getElementById("add-status").innerHTML = "Author does not match the existing book!";
        return false;
    }
    // Check if only the book title is wrong.
    else if(bookTitle !== existingBookTitle){
        document.getElementById("add-status").innerHTML = "Title does not match the existing book!";
        return false;
    }
    return true;
}

function formatTitleAndAuthor(){
    var bookTitle = document.getElementById("book-name").value;
    var author = document.getElementById("author").value;

    // Remove all white spaces
    bookTitle = bookTitle.replace(" ", "");
    author = author.replace(" ", "");

    // Lowercase both strings
    bookTitle = bookTitle.toLowerCase();
    author = author.toLowerCase();
    return {bookTitle, author};
}