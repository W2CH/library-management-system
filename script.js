const books = new Map();

document.addEventListener("DOMContentLoaded",function(){

    const form = document.getElementById("book-info");

    // TODO: Add an event listener that calls our addBook function
    form.addEventListener("submit",function(event){

        // Prevents submission to a server.
        event.preventDefault();

        var bookWasAdded = addBook();
        if(bookWasAdded){
            // Remove the book info that was passed in after adding the book.
            form.reset();
        }
    })
})

function addBook(){

    // This just removes the duplicate ISBN error message.
    document.getElementById("add-status").innerHTML = ""

    // TODO: Get the values that the user passed in
    const bookTitle = document.getElementById("book-name").value;
    const author = document.getElementById("author").value;
    const ISBN = document.getElementById("ISBN").value;

    // TODO Figure out if ISBN already exists and if does, check if its an invalid duplicate.
    if(books.has(ISBN) && !duplicate(ISBN, bookTitle, author)){
        console.log("book was not added!");
       return false;
    }

    // TODO: Since this is a valid duplicate, just update quantity column.
    if(books.has(ISBN)){

        // Get the current quantity value of this book, cast it to int, update it, cast it back to string,
        // and update the quantity column.
        var currentQuantity = Number(document.getElementById(ISBN).cells[3].innerHTML)
        currentQuantity++;
        document.getElementById(ISBN).cells[3].innerHTML = currentQuantity.toString();
        document.getElementById("add-status").innerHTML = "Book has been added!";
        return true;
    }

    // TODO Append the new book to the table

    // This is creating a new row element.
    const newRow = document.createElement("tr");

    // This creates the data for the row we created.
    const newBookTitle = document.createElement("td");
    const newAuthor = document.createElement("td");
    const newISBN = document.createElement("td");
    const bookQuantity = document.createElement("td");

    // Store book data to the table data elements
    newBookTitle.textContent = bookTitle;
    newAuthor.textContent = author;
    newISBN.textContent = ISBN;
    bookQuantity.textContent = "1";

    // TODO: Set tr as the parent of td
    newRow.appendChild(newBookTitle);
    newRow.appendChild(newAuthor);
    newRow.appendChild(newISBN);
    newRow.appendChild(bookQuantity);

    // TODO: Set tbody as the parent of tr
    const bookTable = document.getElementById("book-table");
    bookTable.appendChild(newRow);

    // TODO: Give each new row a unique id using ISBN
    newRow.id = ISBN;

    // TODO: Store new book to our map.
    books.set(ISBN, newRow);

    document.getElementById("add-status").innerHTML = "Book has been added!";
    return true;
}

function duplicate(ISBN, bookTitle, author){
    // Grab the existing book's information with the existing ISBN
    var existingBookTitle = books.get(ISBN).cells[0].innerHTML;
    var existingAuthor = books.get(ISBN).cells[1].innerHTML;

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