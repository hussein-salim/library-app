class Book {
    constructor(title, author, pages, isRead) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }

    toggleReadStatus() {
        this.isRead = !this.isRead;
    }
}

const myLibrary = [];

function addBookToLibrary(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
    saveLibraryToLocalStorage();
    displayBooks();
}

function displayBooks() {
    const libraryDiv = document.querySelector('#library');
    libraryDiv.innerHTML = '';

    myLibrary.forEach((book) => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book-card';
        bookDiv.dataset.id = book.id;

        bookDiv.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Status: ${book.isRead ? 'Read' : 'Not Read Yet'}</p>
            <button class="toggle-read">Toggle Read Status</button>
            <button class="remove-book">Remove Book</button>
        `;

        libraryDiv.appendChild(bookDiv);
    });
}

function saveLibraryToLocalStorage() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function loadLibraryFromLocalStorage() {
    const storedLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    if (storedLibrary) {
        storedLibrary.forEach((book) => {
            const { title, author, pages, isRead } = book;
            addBookToLibrary(title, author, pages, isRead);
        });
    }
}

function toggleModal(modal, state) {
    modal.classList.toggle('active', state);
    document.querySelector('#overlay').classList.toggle('active', state);
}

document.querySelector('#new-book-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const title = event.target.title.value.trim();
    const author = event.target.author.value.trim();
    const pages = parseInt(event.target.pages.value, 10);
    const isRead = event.target.isRead.checked;

    const errorMsg = document.querySelector('#errorMsg');
    if (!title || !author || isNaN(pages) || pages <= 0) {
        errorMsg.textContent = 'Please fill out all fields correctly.';
        return;
    }

    errorMsg.textContent = '';
    addBookToLibrary(title, author, pages, isRead);
    event.target.reset();
    toggleModal(document.querySelector('#addBookModal'), false);
});

document.querySelector('#add-book').addEventListener('click', () => {
    toggleModal(document.querySelector('#addBookModal'), true);
});

document.querySelector('#overlay').addEventListener
const addBookModal = document.querySelector('#addBookModal');
const overlay = document.querySelector('#overlay');

// Close modal when clicking on the overlay
overlay.addEventListener('click', () => {
    toggleModal(addBookModal, false); // Close the modal
});
const githubIcon = document.querySelector('footer .icon');

githubIcon.addEventListener('click', () => {
    // Add the spin class to trigger the animation
    githubIcon.classList.add('spin');

    // Remove the spin class after the animation ends (1 second)
    setTimeout(() => {
        githubIcon.classList.remove('spin');
    }, 1000); // Match the duration of the animation in CSS
});
