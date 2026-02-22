import {useDispatch, useSelector} from "react-redux";
import {voteForAnecdote} from "../reducers/anecdoteReducer.js";
import {showNotification} from "../reducers/notificationReducer.js";

const AnecdoteItem = ({anecdote, handleVote}) =>
    <div>
        <div>{anecdote.content}</div>
        <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
        </div>
    </div>;

const AnecdoteList = () => {
    const dispatch = useDispatch();
    
    const vote = id => {
        const votedAnecdote = sortedAnecdotes.find(anecdote => anecdote.id === id).content;
        
        dispatch(voteForAnecdote(id));
        dispatch(showNotification(`You voted for '${votedAnecdote}'`));
    };
    
    const anecdotes = useSelector(state => state.anecdotes);
    const anecdoteFilter = useSelector(state => state.filter);
    const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.includes(anecdoteFilter));
    const sortedAnecdotes = filteredAnecdotes.sort((a, b) => b.votes - a.votes);
    
    return (
        sortedAnecdotes.map(anecdote => <AnecdoteItem key={anecdote.id} anecdote={anecdote} handleVote={vote} />)
    );
};

export default AnecdoteList;