import {useState} from "react";
import {useMutation, useQuery} from "@apollo/client/react";
import {ALL_AUTHORS, UPDATE_AUTHOR} from "../queries.js";
import { useNotificationDispatch, setNotification } from '../NotificationContext'

const AuthorBirthyearForm = () => {
    const [name, setName] = useState('')
    const [birthyear, setBirthyear] = useState('')

    const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
        updateQueries: [{query: ALL_AUTHORS}]
    })
    const notificationDispatch = useNotificationDispatch()
    
    const {data: authors, ...results} = useQuery(ALL_AUTHORS)
    
    if(results.loading){
        return <div>Loading...</div>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await updateAuthor({variables: {name, setBornTo: Number(birthyear)}})
            setNotification(notificationDispatch, `Author '${name}' birthyear updated`, 'success')
        } catch (error) {
            setNotification(notificationDispatch, error.message, 'error')
        }

        setName('')
        setBirthyear('')
    }

    return (
        <div>
            <h2>Set birthyear</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    name&nbsp;
                    <select onChange={e => setName(e.target.value)} value={name}>
                        <option value="" disabled>Select an author</option>
                        {authors.allAuthors.map(author => (
                            <option key={author.id} value={author.name}>
                                {author.name}
                            </option>
                        ))}
                    </select>
                </label>
                <br/>
                <label>
                    born&nbsp;
                    <input type="text" value={birthyear} onChange={e => setBirthyear(e.target.value)}/>
                </label>
                <br/>
                <button type="submit">update author</button>
            </form>
        </div>
    )
}

export default AuthorBirthyearForm