const Anecdote = ({anecdote}) => (
    <div style={{marginBottom: '1.5rem'}}>
        <h2>{anecdote.content} by {anecdote.author}</h2>
        <div>has {anecdote.votes} votes</div>
        <div>for more info see <a href={anecdote.info}>{anecdote.info}</a> </div>
    </div>
);

export default Anecdote;