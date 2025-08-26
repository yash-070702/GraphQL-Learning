let books = [
  { id: "1", title: "Harry Potter", publishedYear: 1997 },
  { id: "2", title: "Lord of the Rings", publishedYear: 1954 },
];

let authors = [
  { id: "1", name: "J.K. Rowling", books: [books[0]] },
  { id: "2", name: "J.R.R. Tolkien", books: [books[1]] },
];

let publishers = [
  { id: "1", name: "Bloomsbury", location: "UK", authors: [authors[0]] },
  { id: "2", name: "Allen & Unwin", location: "Australia", authors: [authors[1]] },
];

const resolvers = {
  Query: {
    authors: () => authors,
    books: () => books,
    publishers: () => publishers,


    author: (_, { id }) => authors.find((a) => a.id === id),
    book: (_, { id }) => books.find((b) => b.id === id),
    publisher: (_, { id }) => publishers.find((p) => p.id === id),
  },

  Mutation: {
    // ---------------- Add ----------------
    addBook: (_, { title, publishedYear, authorId }) => {
      const newBook = {
        id: String(books.length + 1),
        title,
        publishedYear,
      };
      books.push(newBook);
      const author = authors.find((a) => a.id === authorId);
      if (author) author.books.push(newBook);
      return newBook;
    },

    addAuthor: (_, { name, publisherId }) => {
      const newAuthor = {
        id: String(authors.length + 1),
        name,
        books: [],
      };
      authors.push(newAuthor);
      const publisher = publishers.find((p) => p.id === publisherId);
      if (publisher) publisher.authors.push(newAuthor);
      return newAuthor;
    },

    addPublisher: (_, { name, location }) => {
      const newPublisher = {
        id: String(publishers.length + 1),
        name,
        location,
        authors: [],
      };
      publishers.push(newPublisher);
      return newPublisher;
    },

    // ---------------- Update ----------------
    updateBook: (_, { id, title, publishedYear }) => {
      const book = books.find((b) => b.id === id);
      if (!book) return null;
      if (title !== undefined) book.title = title;
      if (publishedYear !== undefined) book.publishedYear = publishedYear;
      return book;
    },

    updateAuthor: (_, { id, name }) => {
      const author = authors.find((a) => a.id === id);
      if (!author) return null;
      if (name !== undefined) author.name = name;
      return author;
    },

    updatePublisher: (_, { id, name, location }) => {
      const publisher = publishers.find((p) => p.id === id);
      if (!publisher) return null;
      if (name !== undefined) publisher.name = name;
      if (location !== undefined) publisher.location = location;
      return publisher;
    },

    // ---------------- Delete ----------------
    deleteBook: (_, { id }) => {
      const index = books.findIndex((b) => b.id === id);
      if (index === -1) return false;
      books.splice(index, 1);
      authors.forEach((a) => {
        a.books = a.books.filter((b) => b.id !== id);
      });
      return true;
    },

    deleteAuthor: (_, { id }) => {
      const index = authors.findIndex((a) => a.id === id);
      if (index === -1) return false;
      const [removedAuthor] = authors.splice(index, 1);
      publishers.forEach((p) => {
        p.authors = p.authors.filter((a) => a.id !== id);
      });
      books = books.filter((b) => !removedAuthor.books.some((ab) => ab.id === b.id));
      return true;
    },

    deletePublisher: (_, { id }) => {
      const index = publishers.findIndex((p) => p.id === id);
      if (index === -1) return false;
      publishers.splice(index, 1);
      return true;
    },
  },
};

export default resolvers;
