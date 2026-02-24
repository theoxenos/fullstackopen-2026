import {useQuery, useSubscription} from "@apollo/client/react";
import {ALL_BOOK_GENRES, ALL_BOOKS, BOOK_ADDED} from "../queries.js";
import {useState} from "react";
import BooksTable from "./BooksTable.jsx";
import { useNotificationDispatch, setNotification } from '../NotificationContext'
import {updateCache} from "../helpers.js";

const Books = () => {
    const [selectedGenre, setSelectedGenre] = useState('')
    const notificationDispatch = useNotificationDispatch()

    useSubscription(BOOK_ADDED, {
        onData: ({data: {data}, client}) => {
            setNotification(notificationDispatch, `New book '${data.bookAdded.title}' added`, 'success')
            updateCache(client.cache, {query: ALL_BOOKS}, data.bookAdded)
        }
    })

    const {data: books, ...allBooksResult} = useQuery(ALL_BOOKS, {
            variables: selectedGenre ? {
                genre: selectedGenre
            }: {}
        } 
    )

    const allBookGenresResult = useQuery(ALL_BOOK_GENRES)
    const genres = allBookGenresResult.data?.allBookGenres || []

    if (allBooksResult.loading || allBookGenresResult.loading) {
        return <div>Loading...</div>
    }

    if (allBooksResult.error || allBookGenresResult.error) {
        const error = allBooksResult.error || allBookGenresResult.error
        return <div>{error}</div>
    }
    
    const handleGenreChange = async (e) => {
        setSelectedGenre(e.currentTarget.value);
        await allBookGenresResult.refetch()
        await allBooksResult.refetch()
    }

    return (
        <div>
            <h2>books</h2>

            <div>
                <span style={{marginRight: '0.5rem'}}>genre filter:</span>
                <select value={selectedGenre}
                        onChange={handleGenreChange}>
                    <option value={''}>all</option>
                    {genres.map((genre, index) => (
                        <option key={index} value={genre}>{genre}</option>
                    ))}
                </select>
            </div>
            <BooksTable books={books.allBooks}/>
        </div>
    )
}

export default Books
