import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createAnecdote, getAllAnecdotes, updateAnecdote} from "./request.js";
import {useContext} from "react";
import NotificationContext from "./NotificationContext.jsx";

const NOTIFICATION_DURATION = 5_000;

const App = () => {
    const queryClient = useQueryClient();
    const {notificationDispatch} = useContext(NotificationContext);
    
    const newAnecdoteMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: (anecdote) => {
            queryClient.setQueryData(['anecdotes'], (oldData) => [anecdote, ...oldData]);
            
            notificationDispatch({type: 'SET', payload: `created ${anecdote.content}`});
            setTimeout(() => {
                notificationDispatch({type: 'CLEAR'});
            }, NOTIFICATION_DURATION);
        },
        onError: (error) => {
            notificationDispatch({type: 'SET', payload: error.message});
            setTimeout(() => {
                notificationDispatch({type: 'CLEAR'});
            }, NOTIFICATION_DURATION);
        }
    });
    
    const updateAnecdoteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: (updatedAnecdote) => {
            queryClient.setQueryData(['anecdotes'], (oldData) => oldData.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote));

            notificationDispatch({type: 'SET', payload: `voted for ${updatedAnecdote.content}`});
            setTimeout(() => {
                notificationDispatch({type: 'CLEAR'});
            }, NOTIFICATION_DURATION);
        }
    });

    const handleVote = (anecdote) => {
        anecdote.votes += 1;
        updateAnecdoteMutation.mutate(anecdote);
    }
    
    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAllAnecdotes,
        retry: 1
    });
    
    if(result.isError) {
        return <div>anecdote service not available due to problems in server</div>;
    }
    
    if(result.isLoading) {
        return <div>Loading...</div>;
    }

    
    
    const anecdotes = result.data;

    return (
        <div>
            <h3>Anecdote app</h3>

            <Notification/>
            <AnecdoteForm onCreate={newAnecdoteMutation.mutateAsync}/>

            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default App
