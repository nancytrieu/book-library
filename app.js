let b1 = new Book("tiny", "josh", 12, 'not read');
let b2 = new Book("big", "nancy", 100, 'read');

let myLibrary = [];
let isSeen = [];

myLibrary.push(b1);
myLibrary.push(b2);

// Book object
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}


// Creates new book object using constructor and adds it to myLibrary array
function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    console.log(book);
    myLibrary.push(book);
    console.log(myLibrary);
    displayData();
}

// Checks if book is already shown on page 
function isInSeen(newBook) {
    for(i=0; i<isSeen.length; i++) {
        if (newBook.title == isSeen[i].title && newBook.author == isSeen[i].author) {
            return true;
        } 
    } 
    return false;
}

// Displays each book in myLibrary array onto page 
function displayData(){
    let table = document.getElementById('table');

    let tbody = document.createElement('tbody');
    table.appendChild(tbody);

    myLibrary.forEach(book => {
        if (!isInSeen(book)){
            let row = document.createElement('tr');
            
            let cellTitle = document.createElement('td');
            cellTitle.textContent = book.title;
            row.appendChild(cellTitle);

            let cellAuthor = document.createElement('td');
            cellAuthor.textContent = book.author;
            row.appendChild(cellAuthor);

            let cellPages = document.createElement('td');
            cellPages.textContent = book.pages;
            row.appendChild(cellPages);

            let cellRead = document.createElement('td');
            cellRead.textContent = book.read;
            row.appendChild(cellRead);

            let deleteBtn = document.createElement('input');
            deleteBtn.type = 'button';
            deleteBtn.className = 'btn-close';
            deleteBtn.onclick = (function() {
                for(i=0; i<myLibrary.length; i++) {
                    if (book.title == myLibrary[i].title && book.author == myLibrary[i].author) {
                        myLibrary.splice(i, 1);
                        isSeen.splice(i, 1);
                        row.parentNode.removeChild(row);
                    }
                } console.log(myLibrary)
            })
            row.appendChild(deleteBtn);

            tbody.appendChild(row);
            
            isSeen.push(book);
        }
    })
}

// Retrieves data entered from html form and checks if book is already in myLibrary array
function getData(form) {
    let formData = new FormData(form);
    let json = Object.fromEntries(formData);

    console.log(json);

    for(i=0; i<myLibrary.length; i++) {
        if (json['title'] == myLibrary[i].title && json['author'] == myLibrary[i].author) {
            return alert('Book is already in Library');
        } 
        else if (json['title'] == '' || json['author'] == '' || json['pages'] == '' || json['read'] == '') {
            return alert('Please fill in all fields');
        }
    } 
    // console.log(json['pages']);
    addBookToLibrary(json["title"], json["author"], json['pages'], json['read']);
    
}

// Logs data when submit button is clicked
document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();
    getData(e.target);
});
