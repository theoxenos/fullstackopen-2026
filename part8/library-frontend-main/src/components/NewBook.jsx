import {useState} from 'react'
import {useMutation} from "@apollo/client/react";
import {ALL_AUTHORS, ALL_BOOK_GENRES, ALL_BOOKS, CREATE_BOOK} from "../queries.js";
import {useNotificationDispatch, setNotification} from '../NotificationContext'
import {updateCache} from "../helpers.js";

const NewBook = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [published, setPublished] = useState('')
    const [genre, setGenre] = useState('')
    const [genres, setGenres] = useState([])

    const [addBook] = useMutation(CREATE_BOOK, {
        refetchQueries: [{query: ALL_AUTHORS}, {query: ALL_BOOK_GENRES}],
        update: (cache, { data }) => {
            if (!data || !data.addBook) {
                console.error('Invalid mutation response:', data)
                return;
            }
            updateCache(cache, {query: ALL_BOOKS, addedBook: data.addBook})
        }
    })
    const notificationDispatch = useNotificationDispatch()

    const submit = async (event) => {
        event.preventDefault()

        try {
            await addBook({variables: {title, author, published: Number(published), genres}})
            setNotification(notificationDispatch, `Book '${title}' added`, 'success')
        } catch (error) {
            setNotification(notificationDispatch, error.message, 'error')
        }

        setTitle('')
        setPublished('')
        setAuthor('')
        setGenres([])
        setGenre('')
    }

    const addGenre = () => {
        setGenres(genres.concat(genre))
        setGenre('')
    }

    return (
        <div>
            <h2>add book</h2>
            <form onSubmit={submit}>
                <div>
                    title
                    <input
                        value={title}
                        onChange={({target}) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        value={author}
                        onChange={({target}) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    published
                    <input
                        type="number"
                        value={published}
                        onChange={({target}) => setPublished(target.value)}
                    />
                </div>
                <div>
                    <input
                        value={genre}
                        onChange={({target}) => setGenre(target.value)}
                    />
                    <button onClick={addGenre} type="button">
                        add genre
                    </button>
                </div>
                <div>genres: {genres.join(' ')}</div>
                <button type="submit">create book</button>
            </form>
        </div>
    )
}

export default NewBook
