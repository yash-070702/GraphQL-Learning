import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    publishedYear: Int
  }

  type Author {
    id: ID!
    name: String!
    books: [Book!]!
  }

  type Publisher {
    id: ID!
    name: String!
    location: String
    authors: [Author!]!
  }

  type Query {
    authors: [Author!]!
    books: [Book!]!
    publishers: [Publisher!]!

    # Fetch by ID
    author(id: ID!): Author
    book(id: ID!): Book
    publisher(id: ID!): Publisher
  }

  type Mutation {
    # Add
    addBook(title: String!, publishedYear: Int!, authorId: ID!): Book!
    addAuthor(name: String!, publisherId: ID!): Author!
    addPublisher(name: String!, location: String!): Publisher!

    # Update
    updateBook(id: ID!, title: String, publishedYear: Int): Book
    updateAuthor(id: ID!, name: String): Author
    updatePublisher(id: ID!, name: String, location: String): Publisher

    # Delete
    deleteBook(id: ID!): Boolean
    deleteAuthor(id: ID!): Boolean
    deletePublisher(id: ID!): Boolean
  }
`;

export default typeDefs;
