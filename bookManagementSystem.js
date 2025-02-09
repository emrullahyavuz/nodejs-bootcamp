const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3001;
const booksFile = path.join(__dirname, 'books.json');

// Middleware
app.use(express.json());

const validateBook = (req, res, next) => {
    const { title, author, year, genre, pages } = req.body;
    if (!title || !author || !year || !genre || !pages) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    next();
};

const checkDuplicateTitle = (req, res, next) => {
    const books = readBooks();
    if (books.some(book => book.title === req.body.title)) {
        return res.status(400).json({ error: 'Book with this title already exists.' });
    }
    next();
};

// Helper Functions For Reading and Writing Books
const readBooks = () => {
    if (!fs.existsSync(booksFile)) return [];
    const data = fs.readFileSync(booksFile);
    return JSON.parse(data);
};

const writeBooks = (books) => {
    fs.writeFileSync(booksFile, JSON.stringify(books, null, 2));
};

// Read All Books
app.get('/books', (req, res) => {
    const books = readBooks();
    let filteredBooks = books;
    if (req.query.genre) {
        filteredBooks = filteredBooks.filter(book => book.genre.toLowerCase() === req.query.genre.toLowerCase());
    }
    if (req.query.year) {
        filteredBooks = filteredBooks.filter(book => book.year == req.query.year);
    }
    if (req.query.page && req.query.limit) {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        filteredBooks = filteredBooks.slice(startIndex, endIndex);
    }
    res.json(filteredBooks);
});

// Add New Book
app.post('/books', validateBook, checkDuplicateTitle, (req, res) => {
    const { title, author, year, genre, pages } = req.body;
    const books = readBooks();
    const newBook = {
        id: books.length ? books[books.length - 1].id + 1 : 1,
        title,
        author,
        year,
        genre,
        pages
    };
    books.push(newBook);
    writeBooks(books);
    res.status(201).json(newBook);
});

// Update Book
app.put('/books/:id', validateBook, (req, res) => {
    const { id } = req.params;
    const { title, author, year, genre, pages } = req.body;
    const books = readBooks();
    const bookIndex = books.findIndex(book => book.id == id);
    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found.' });
    }
    books[bookIndex] = { ...books[bookIndex], title, author, year, genre, pages };
    writeBooks(books);
    res.json(books[bookIndex]);
});

// Delete Book
app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    let books = readBooks();
    const bookIndex = books.findIndex(book => book.id == id);
    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found.' });
    }
    books = books.filter(book => book.id != id);
    writeBooks(books);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});