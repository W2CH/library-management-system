document.addEventListener("DOMContentLoaded",function(){

    const form = document.getElementById("book-info")

    // TODO: Add an event listener that calls our addBook function
    form.addEventListener("submit",function(event){

        // Prevents submission to a server.
        event.preventDefault();
        addBook();

        // Remove the book info that was passed in after adding the book.
        form.reset()
    })
})

function addBook(){

    // TODO: Get the values that the user passed in
    const bookTitle = document.getElementById("book-name").value;
    const author = document.getElementById("author").value;
    const ISBN = document.getElementById("ISBN").value;

    // TODO Append the new book to the table

    // This is creating a new row element.
    const newRow = document.createElement("tr");

    // This creates the data for the row we created.
    const newBookTitle = document.createElement("td");
    const newAuthor = document.createElement("td");
    const newISBN = document.createElement("td");

    // Store book data to the table data elements
    newBookTitle.textContent = bookTitle;
    newAuthor.textContent = author;
    newISBN.textContent = ISBN;


    // TODO: Set tr as the parent of td
    newRow.appendChild(newBookTitle);
    newRow.appendChild(newAuthor);
    newRow.appendChild(newISBN);

    // TODO: Set tbody as the parent of tr
    const bookTable = document.getElementById("book-table");
    bookTable.appendChild(newRow);

    console.log("Book has been added!")
}