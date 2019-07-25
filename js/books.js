let myLibrary = localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : []
let newBookBtn = document.querySelector("#newbook");

localStorage.setItem('books', JSON.stringify(myLibrary))

function Book(title, author, pages, status) {
  this.title = title
  this.author = author
  this.pages = pages
  this.status = status

  this.info = function () {
    return this.title + "by" +  this.author + ", " + this.pages + "pages, " + this.status
  }
}

// Take user input and store book objects into library array
function addBookToLibrary(title, author, pages, status) {
  title = document.querySelector("#title").value;
  author = document.querySelector("#author").value;
  pages = document.querySelector("#pages").value;
  status = document.querySelector("#status").value;
  book = new Book(title, author, pages, status);
  myLibrary.push(book);
  localStorage.setItem('books', JSON.stringify(myLibrary))
}

function remove(book) {
  let idx = Number(book.parentNode.parentNode.id);

  if(confirm(`Click 'OK' if you want to delete ${myLibrary[idx].title} from your library`)) {
    myLibrary.splice(idx, 1);
    if (typeof(Storage) !== "undefined") {
      localStorage.setItem("books", JSON.stringify(myLibrary));
    }
  }

  render();
}


function toggleReadStatus(book) {
  console.log("in the toggle read status!")
  let idx = Number(book.parentNode.parentNode.id);
  (myLibrary[idx].status == "unread") ? myLibrary[idx].status = "read" : myLibrary[idx].status = "unread";
  if (typeof(Storage) !== "undefined") {
    localStorage.setItem("books", JSON.stringify(myLibrary));
  }
  render();
}

function render() {
  clearTable();
  let table = document.querySelector("#library");
  myLibrary.forEach((book, index) => {
    let row = table.insertRow();
    row.id = index;
    let title = row.insertCell();
    let author = row.insertCell();
    let pages = row.insertCell();

    
    let cell = row.insertCell();
    let status = document.createElement("SPAN");
    status.classList.add("status");
    status.innerHTML = book.status;
    status.setAttribute("onclick", "toggleReadStatus(this);");
    cell.appendChild(status);

    title.innerHTML = book.title;
    author.innerHTML = book.author;
    pages.innerHTML = book.pages;

    cell = row.insertCell();
    let removeBtn = document.createElement("BUTTON");
    removeBtn.innerHTML = "Delete";
    removeBtn.setAttribute("onclick", "remove(this);")
    cell.appendChild(removeBtn);
  });
}

function showModal(){
  let modal = document.querySelector(".newBook-modal");
  modal.style.display = 'block';
}

function hideModal() {
  let modal = document.querySelector(".newBook-modal");
  modal.style.display = 'none';
}

let closeBtn = document.querySelector(".close")
closeBtn.addEventListener("click", function() {
  hideModal();
});

newBookBtn.addEventListener("click", function() {
  showModal();
})

function clearTable() {
  document.querySelector("#library").innerHTML = `<tbody><tr id="shelf-headers">
    <th>Title</th>
    <th>Author</th>
    <th>Pages</th>
    <th>Status</th>
    <th></th>
  </tr>
  </tbody>`
}

let form = document.querySelector("#form");
form.addEventListener("submit", function(a) {
  a.preventDefault(); // cancels the default action that belongs to the event
  addBookToLibrary();
  hideModal();
  render();
})


// addBookToLibrary("Wherever You Go, There You Are", "Jon Kabat-Zinn", 200, "already read")
// addBookToLibrary("A second book!", "Jon Kabat-Zinn", 200, "already read")
// renderLibrary();
// console.log(myLibrary);
render();