import AnecdoteForm from "./components/AnecdoteForm.jsx";
import AnecdoteList from "./components/AnecdoteList.jsx";
import Filter from "./components/Filter.jsx"
import Notification from "./components/Notification.jsx";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {initialiseAnecdotes} from "./reducers/anecdoteReducer.js";

const App = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(initialiseAnecdotes());
    });
    
    return (
        <div>
            <h2>Anecdotes</h2>
            <Notification />
            <Filter />
            <AnecdoteList />
            <h2>create new</h2>
            <AnecdoteForm />
        </div>
    )
}

export default App
