import {useDispatch} from "react-redux";
import {appendAnecdote} from "../reducers/anecdoteReducer.js";
import {showNotification} from "../reducers/notificationReducer.js";

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const content = event.target.content.value;
        event.target.content.value = '';

        dispatch(appendAnecdote(content));
        dispatch(showNotification(`You created '${content}'`));
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input type="text" name="content"/>
            </div>
            <button type="submit">create</button>
        </form>
    );
};

export default AnecdoteForm;