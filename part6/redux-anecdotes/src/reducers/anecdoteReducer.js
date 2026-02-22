import {createSlice} from "@reduxjs/toolkit";

import anecdoteService from "../services/anecdotes.js";

const initialState = [];

const anecdoteSlice = createSlice({
    name: 'anecdote',
    initialState,
    reducers: {
        createAnecdote: (state, action) => {
            state.push(action.payload);
        },
        voteAnecdote: (state, action) => {
            state.find(anecdote => anecdote.id === action.payload).votes++;
        },
        setAnecdotes: (state, action) => {
            return action.payload;
        }
    }
});

const {createAnecdote, setAnecdotes, voteAnecdote} = anecdoteSlice.actions;

export const initialiseAnecdotes = () => async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
};

export const appendAnecdote = (content) => async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(createAnecdote(newAnecdote));
};

export const voteForAnecdote = (id) => async (dispatch, getState) => {
    const state = getState();
    const votedNote = state.anecdotes.find(anecdote => anecdote.id === id);
    await anecdoteService.updateVotes(id, votedNote.votes + 1);
    dispatch(voteAnecdote(id));
}

export const {} = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
