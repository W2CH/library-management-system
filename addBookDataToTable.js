export function addBookToTable(tableBody,ISBN){

    //TODO: Get all the book data from local storage
    var stringBookInfo = localStorage.getItem(ISBN);
    var bookInfoArray = JSON.parse(stringBookInfo);
    var retrievedBook = new Map(bookInfoArray);

    const newRow = document.createElement("tr");

    // This creates cells for the row we created.
    const newBookTitle = document.createElement("td");
    const newAuthor = document.createElement("td");
    const newISBN = document.createElement("td");
    const bookQuantity = document.createElement("td");


    // TODO: Store book data to the table data elements using data retrieved from local storage
    newBookTitle.textContent = retrievedBook.get("userBookTitleInput");
    newAuthor.textContent = retrievedBook.get("userAuthorInput");
    newISBN.textContent = ISBN;
    bookQuantity.textContent = retrievedBook.get("quantity");

    // Set tr as the parent of td
    newRow.appendChild(newBookTitle);
    newRow.appendChild(newAuthor);
    newRow.appendChild(newISBN);
    newRow.appendChild(bookQuantity);

    if(tableBody !== "search-results"){
        const edit = document.createElement("td");
        // Creating a edit button
        const newEditButton = document.createElement("input");
        newEditButton.type = "button";
        newEditButton.value = "Edit";
        newEditButton.classList.add("edit-button");      // Add a class to the button
        newEditButton.dataset.isbn = ISBN;
        edit.appendChild(newEditButton);
        newRow.appendChild(edit);
    }

    // Set tbody as the parent of tr
    const bookTable = document.getElementById(tableBody);
    bookTable.appendChild(newRow);

    // Give each new row a unique id using ISBN
    newRow.id = ISBN;
}