export const typeDefs = /*GraphQL*/`
    type Book {
        title: String!,
        author: Author!,
        published: Int,
        id: String!,
        genres: [String]
    }

    type Author {
        id: String!,
        name: String!,
        born: Int,
        bookCount: Int,
    }

    type User {
        id: ID!,
        username: String!,
        favouriteGenre: String!,
    }

    type Token {
        value: String!
    }

    type Query {
        bookCount: Int!,
        authorCount: Int!,
        allBooks(author: String, genre: String): [Book],
        allBookGenres: [String],
        allAuthors: [Author],
        me: User
    }

    type Mutation {
        addBook(
            title: String!,
            author: String!,
            published: Int,
            genres: [String]
        ): Book!

        editAuthor(name: String!, setBornTo: Int!): Author

        createUser(username: String!, favouriteGenre: String!): User
        login(username: String!, password: String!): Token
    }
    
    type Subscription {
        bookAdded: Book!
    }
`