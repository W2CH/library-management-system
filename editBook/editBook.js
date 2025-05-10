export default function editBook(ISBN) {
    document.getElementById("main-view").hidden = true;
    document.getElementById("edit-view").hidden = false;
    document.getElementById("return-main").hidden = false;

    const bookMap = new Map(JSON.parse(localStorage.getItem(ISBN)));
    const editView = document.getElementById("edit-view");
    editView.innerHTML = "";

    const form = document.createElement("form");
    form.id = "edit-form";

    // TODO: Handle book title input
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.id = "edit-title";
    titleInput.value = bookMap.get("userBookTitleInput");
    titleInput.required = true;
    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Title: ";
    titleLabel.appendChild(titleInput);
    form.appendChild(titleLabel);
    form.appendChild(document.createElement("br"));

    // TODO: Handle book author input
    const authorInput = document.createElement("input");
    authorInput.type = "text";
    authorInput.id = "edit-author";
    authorInput.value = bookMap.get("userAuthorInput");
    authorInput.required = true;
    const authorLabel = document.createElement("label");
    authorLabel.textContent = "Author: ";
    authorLabel.appendChild(authorInput);
    form.appendChild(authorLabel);
    form.appendChild(document.createElement("br"));

    // TODO: Handle ISBN input
    const ISBNInput = document.createElement("input");
    ISBNInput.type = "text";
    ISBNInput.value = ISBN;
    ISBNInput.disabled = true;
    const isbnLabel = document.createElement("label");
    isbnLabel.textContent = "ISBN: ";
    isbnLabel.appendChild(ISBNInput);
    form.appendChild(isbnLabel);
    form.appendChild(document.createElement("br"));

    // TODO: Handle quantity input
    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.id = "edit-quantity";
    quantityInput.value = bookMap.get("quantity");
    quantityInput.required = true;
    const quantityLabel = document.createElement("label");
    quantityLabel.textContent = "Quantity: ";
    quantityLabel.appendChild(quantityInput);
    form.appendChild(quantityLabel);
    form.appendChild(document.createElement("br"));

    const submitButton = document.createElement("input");
    submitButton.type = "submit";
    submitButton.value = "Save Changes";
    form.appendChild(submitButton);

    // Add form to the view
    editView.appendChild(form);
}
