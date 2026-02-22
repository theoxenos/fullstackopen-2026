const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => { 
    const response = await fetch(baseUrl);
    
    if(!response.ok) {
        throw new Error('Failed to fetch anecdotes');
    }
    
    return response.json();
};

const createNew = async (content) => {
    const anecdote = {content, votes: 0};
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(anecdote)
    });
    
    if(!response.ok) {
        throw new Error('Failed to create anecdote');
    }
    
    return response.json();
};

const updateVotes = async (id, newVoteAmount) => {
    const response = await fetch(`${baseUrl}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({votes: newVoteAmount})
    });
    
    if(!response.ok) {
        throw new Error('Failed to update anecdote votes');
    }
    
    return response.json();
};

export default {getAll, createNew, updateVotes};