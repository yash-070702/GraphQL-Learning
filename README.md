📚 GraphQL Backend – Publishers, Authors & Books

This project is a GraphQL API built with Express.js and Apollo Server.
It demonstrates how to manage relationships between Publishers, Authors, and Books with Queries & Mutations including full CRUD operations.

🚀 Features

⚡ GraphQL API with Express + Apollo Server

🔎 Queries:

Get all publishers, authors, and books

Get a single publisher, author, or book by ID

✍️ Mutations:

Add, Edit, and Delete Publishers, Authors, and Books

📦 In-memory data storage (easy to swap with a database later)

📂 Project Structure
graphql-backend/
│── package.json
│── server.js          # Entry point
│── schema.js          # GraphQL typeDefs
│── resolvers.js       # Query & Mutation resolvers

📦 Installation

Clone the repo:

git clone https://github.com/your-username/graphql-backend.git
cd graphql-backend


Install dependencies:

npm install express apollo-server-express graphql
npm install --save-dev nodemon

▶️ Running the Server

Start the server in development mode:

npm run dev


or with plain Node.js:

node server.js


By default, the server runs at:

http://localhost:4000/graphql

🛠 Example Queries
Get all authors with their books
query {
  authors {
    id
    name
    books {
      title
    }
  }
}

Get a single book by ID
query {
  book(id: "1") {
    id
    title
    publishedYear
  }
}

✍️ Example Mutations
Add a new Publisher
mutation {
  addPublisher(name: "O’Reilly", location: "USA") {
    id
    name
    location
  }
}

Edit an Author
mutation {
  updateAuthor(id: "2", name: "Updated Name") {
    id
    name
  }
}

Delete a Book
mutation {
  deleteBook(id: "3") {
    id
    title
  }
}

🧪 Using Apollo Sandbox

Once the server is running, open:
👉 http://localhost:4000/graphql

Apollo Sandbox will load in your browser where you can test Queries & Mutations interactively.
