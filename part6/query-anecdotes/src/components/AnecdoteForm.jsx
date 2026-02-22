const AnecdoteForm = ({onCreate}) => {
  const handleCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    onCreate(content);
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={handleCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
