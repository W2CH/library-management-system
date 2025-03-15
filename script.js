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

    // This just resets message.
    document.getElementById("add-status").innerHTML = ""

    // TODO: Get the values that the user passed in
    const bookTitle = document.getElementById("book-name").value;
    const author = document.getElementById("author").value;
    var ISBN = document.getElementById("ISBN").value;

    // Converts the x at the end of an ISBN to uppercase.
    if(ISBN[9] === "x"){
        ISBN = ISBN.replace("x", "X");
    }
    // TODO: Figure out if the ISBN is valid
    if(!validISBN(ISBN)){
        console.log("book was not added!");
        return false;
    }
    // TODO Figure out if ISBN already exists and if does, check if its an invalid duplicate.
    if(books.has(ISBN) && !duplicate(ISBN, bookTitle, author)){
        console.log("book was not added!");
        document.getElementById("add-status").innerHTML = "book was not added!";
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
    newBookTitle.textContent = bookTitle;
    newAuthor.textContent = author;
    newISBN.textContent = ISBN;
    bookQuantity.textContent = "1";
    edit.appendChild(newEditButton);

    // TODO: Set tr as the parent of td
    newRow.appendChild(newBookTitle);
    newRow.appendChild(newAuthor);
    newRow.appendChild(newISBN);
    newRow.appendChild(bookQuantity);
    newRow.appendChild(edit);

    // TODO: Set tbody as the parent of tr
    const bookTable = document.getElementById("book-table");
    bookTable.appendChild(newRow);

    // TODO: Give each new row a unique id using ISBN
    newRow.id = ISBN;

    // TODO: Store new book to our map.
    books.set(ISBN, newRow);

    document.getElementById("add-status").innerHTML = "Book has been added!";
    // var number = Number(document.getElementById(ISBN).cells[2].innerHTML);
    // console.log("Value of ISBN after convert:",number);
    return true;
}

function validISBN(ISBN){
    // A valid ISBN can ONLY have 10 or 13 digits.
    if(ISBN.length !== 13 && ISBN.length !== 10){
        document.getElementById("add-status").innerHTML = "ISBN can only have 10 or 13 digits.";
        return false;
    }

    // This checks that 13 digit ISBNs are valid.
    if(ISBN.length === 13){
        for(let i = 0; i < ISBN.length; i++){
            if(ISBN[i] < "0" || ISBN[i] > "9"){
                document.getElementById("add-status").innerHTML = "This ISBN can only have digits.";
                return false;
            }
        }
        return true;
    }

    // This will check if 10 digit ISBNs are valid

    // This makes sure that if an X exists, it should only be at the end of the ISBN.
    for(let i = 0; i < ISBN.length; i++){
        if(ISBN[i] === "X" && i !== 9){
            document.getElementById("add-status").innerHTML = "This ISBN can only have an X at the end.";
            return false;
        }
    }

    // Check that every character in the ISBN is either a number between 0 and 9 or the character X.
    for(let i = 0; i < ISBN.length; i++){

        // It is invalid if the current character is NOT a number or X
        if((ISBN[i] < "0" || ISBN[i] > "9") && ISBN[i] !== "X"){
            document.getElementById("add-status").innerHTML = "This ISBN can only be represented using " +
                "only digits or it can have an X at the end.";
            return false;
        }
    }
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