const BASE_URL = 'http://localhost:3001/anecdotes/';

export const getAllAnecdotes = async () => {
    const response = await fetch(BASE_URL);
    
    if(!response.ok) {
        throw new Error('failed to fetch data')
    }
    
    return await response.json();
}

export const createAnecdote = async (content) => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({content})
    });
    
    if(!response.ok) {
        const {error} = await response.json();
        throw new Error(error);
    }
    
    return await response.json();
};

export const updateAnecdote = async (anecdote) => {
    const response = await fetch(BASE_URL + anecdote.id, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(anecdote)
    });
    
    if(!response.ok) {
        throw new Error('failed to update anecdote')
    }
    
    return await response.json();
};