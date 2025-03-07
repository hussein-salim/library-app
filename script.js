let myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  saveLibrary();
}

function saveLibrary() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function loadLibrary() {
  const storedLibrary = localStorage.getItem('myLibrary');
  if (storedLibrary) {
    myLibrary = JSON.parse(storedLibrary);
    myLibrary.forEach(book => {
      book.__proto__ = Book.prototype; // Ensure prototype methods are available
    });
  }
}

function displayBooks() {
  const libraryContainer = document.getElementById('library-container');
  libraryContainer.innerHTML = ''; // Clear previous content

  myLibrary.forEach(book => {
    const bookCard = createBookCard(book);
    libraryContainer.appendChild(bookCard);
  });
}

function createBookCard(book) {
  const bookCard = document.createElement('div');
  bookCard.classList.add('book-card');
  bookCard.setAttribute('data-id', book.id);

  bookCard.innerHTML = `
    <h2>${book.title}</h2>
    <p>Author: ${book.author}</p>
    <p>Pages: ${book.pages}</p>
    <p>Read: ${book.read ? 'Yes' : 'No'}</p>
    <button class="remove-book">Remove</button>
    <button class="toggle-read">Toggle Read</button>
  `;

  return bookCard;
}

function removeBook(id) {
  myLibrary = myLibrary.filter(book => book.id !== id);
  saveLibrary();
  displayBooks();
}

function toggleReadStatus(id) {
  const book = myLibrary.find(book => book.id === id);
  if (book) {
    book.read = !book.read;
    saveLibrary();
  }
  displayBooks();
}

document.getElementById('library-container').addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-book')) {
    const id = event.target.parentElement.getAttribute('data-id');
    removeBook(id);
  } else if (event.target.classList.contains('toggle-read')) {
    const id = event.target.parentElement.getAttribute('data-id');
    toggleReadStatus(id);
  }
});

const newBookForm = document.getElementById('new-book-form');

newBookForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;

  // Basic form validation
  if (!title || !author || pages <= 0) {
    alert('Please provide valid book details.');
    return;
  }

  addBookToLibrary(title, author, pages, read);
  displayBooks();

  newBookForm.reset();
  newBookForm.style.display = 'none';
});

loadLibrary();
displayBooks();