export function validISBN(ISBN){
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