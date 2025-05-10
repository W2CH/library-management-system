import {validISBN} from '../../validateISBN.js';
import {addBookToTable} from '../../addBookDataToTable.js';

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
    // Figure out if ISBN already exists and if it does, check if it's an invalid duplicate.
    if(localStorage.getItem(ISBN) && !duplicate(ISBN, bookTitle, author)){
        console.log("The ISBN exists but the info that was passed is wrong!");
        document.getElementById("add-status").innerHTML = "book was not added!";
        return false;
    }

    // Since this is a valid duplicate, just update quantity column.
    if(localStorage.getItem(ISBN) !== null){
        // Get the current quantity value of this book, cast it to int, update it, cast it back to string,
        // and update the quantity column in the table.
        var currentQuantity = Number(document.getElementById(ISBN).cells[3].innerHTML)
        currentQuantity++;
        document.getElementById(ISBN).cells[3].innerHTML = currentQuantity.toString();

        // Updates quantity value in local storage
        // Get the book data from local storage
        let stringBookInfo = localStorage.getItem(ISBN);
        let bookInfoArray = JSON.parse(stringBookInfo);
        let retrievedBook = new Map(bookInfoArray);

        // This is updating the book quantity value
        currentQuantity = retrievedBook.get("quantity");
        retrievedBook.set("quantity", currentQuantity + 1);

        // Marshall map back to JSON
        let saveNewBookQuantity = Array.from(retrievedBook.entries());
        localStorage.setItem(ISBN, JSON.stringify(saveNewBookQuantity));
        document.getElementById("add-status").innerHTML = "Book has been added!";
        return true;
    }

    // Store new book to a map and store map data in local storage
    var book = new Map();
    book.set("author", author);
    book.set("bookTitle", bookTitle);
    book.set("ISBN", ISBN);
    book.set("quantity", 1);
    book.set("userAuthorInput", document.getElementById("author").value);
    book.set("userBookTitleInput", document.getElementById("book-name").value);
    var newBook = Array.from(book.entries());
    localStorage.setItem(ISBN, JSON.stringify(newBook));

    // TODO: Append the new book to the table
    addBookToTable("book-table", ISBN);

    // var number = Number(document.getElementById(ISBN).cells[2].innerHTML);
    // console.log("Value of ISBN after convert:",number);
    return true;
}

function duplicate(ISBN, bookTitle, author){

    // Parse JSON back to a map
    let stringBookInfo = localStorage.getItem(ISBN);
    let bookInfoArray = JSON.parse(stringBookInfo);
    let retrievedBook = new Map(bookInfoArray);

    // Grab the existing book's information with the existing ISBN
    let existingBookTitle = retrievedBook.get("bookTitle");
    let existingAuthor = retrievedBook.get("author");

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