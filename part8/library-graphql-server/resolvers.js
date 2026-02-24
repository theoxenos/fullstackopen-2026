import Book from "./models/book.js";
import Author from "./models/author.js";
import {GraphQLError} from "graphql/error/index.js";
import User from "./models/user.js";
import jwt from "jsonwebtoken";
import {PubSub} from "graphql-subscriptions";

const pubsub = new PubSub()

export const resolvers = {
    Query: {
        bookCount: async () => Book.countDocuments(),
        authorCount: async () => Author.countDocuments(),
        allBooks: async (root, args) => {
            const {author, genre} = args;

            let query = {};

            if (author) {
                const authorDoc = await Author.findOne({name: author});
                if (authorDoc) {
                    query.author = authorDoc._id;
                } else {
                    return [];
                }
            }

            if (genre) {
                query.genres = {$in: [genre]};
            }

            return Book.find(query).populate('author');
        },
        allBookGenres: async (root, args) => await Book.distinct('genres'),
        allAuthors: async () => {
            return Author.aggregate([
                {
                    $lookup: {
                        from: 'books',
                        localField: '_id',
                        foreignField: 'author',
                        as: 'books'
                    }
                },
                {
                    $addFields: {
                        bookCount: {$size: '$books'},
                        id: {$toString: '$_id'}
                    }
                },
                {
                    $project: {
                        books: 0,
                        _id: 0
                    }
                }
            ]);
        },
        me: (root, args, context) => context.currentUser,
    },
    Mutation: {
        addBook: async (root, args, context) => {
            const {author: authorName, title, genres, published} = args;
            const {currentUser} = context

            if (!currentUser) {
                throw new GraphQLError('Not authorised', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }

            let author
            try {
                author = await Author.findOne({name: authorName})
                if (!author) {
                    author = new Author({name: authorName})
                    await author.save()
                }
            } catch (error) {
                if (error.name === 'ValidationError') {
                    throw new GraphQLError('Author validation failed', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: authorName,
                            error: error.message
                        }
                    })
                }
            }

            try {
                const book = new Book({author: author._id, title, genres, published})

                await book.save()
                await book.populate('author')

                await pubsub.publish('BOOK_ADDED', {bookAdded: book})

                return book
            } catch (error) {
                if (error.name === 'ValidationError') {
                    throw new GraphQLError('Book validation failed', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: title,
                            error: error.message
                        }
                    })
                }
            }
        },
        editAuthor: async (root, args, context) => {
            const {name, setBornTo: born} = args
            const {currentUser} = context

            if (!currentUser) {
                throw new GraphQLError('Not authorised', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }

            const author = await Author.findOne({name})
            if (!author) {
                throw new GraphQLError('Author not found', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: name
                    }
                })
            }

            author.born = born;

            return author.save()
        },
        createUser: async (root, args) => {
            const {username, favouriteGenre} = args

            try {
                const user = new User({username, favouriteGenre})

                return await user.save()
            } catch (error) {
                if (error.name === 'ValidationError') {
                    throw new GraphQLError('User already exists', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: username
                        }
                    })
                }
            }
        },
        login: async (root, args) => {
            const {username, password} = args
            const user = await User.findOne({username})
            if (!user || password !== 'password') {
                throw new GraphQLError('User not found', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                })
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return {value: jwt.sign(userForToken, process.env.JWT_SECRET)}
        }
    },
    Subscription: {
        bookAdded: {
            subscribe: async () => pubsub.asyncIterableIterator('BOOK_ADDED')
        }
    }
}