import {useQuery} from "@apollo/client/react";
import {ALL_BOOKS, ME} from "../queries.js";
import BooksTable from "./BooksTable.jsx";

const UserRecommendations = () => {
    const meQuery = useQuery(ME)
    const favouriteGenre = meQuery.data?.me.favouriteGenre

    const booksQuery = useQuery(ALL_BOOKS, {
        variables: {
            genre: favouriteGenre
        },
        skip: !favouriteGenre
    })

    if (meQuery.loading || booksQuery.loading) {
        return <div>Loading...</div>
    }
    if (meQuery.error || booksQuery.error) {
        const error = meQuery.error ?? booksQuery.error
        return <div>Error: {error.message}</div>
    }

    return (
        <div>
            <h2>recommendations</h2>
            <p>books in your favourite genre: <strong>{favouriteGenre}</strong></p>
            <BooksTable books={booksQuery.data.allBooks}/>
        </div>
    )
}

export default UserRecommendations