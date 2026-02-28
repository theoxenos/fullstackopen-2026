const TodoItem = (props) => {
    const { todo, onClickDelete, onClickComplete } = props;

    const doneInfo = (
        <>
            <span>This todo is done</span>
            <span>
              <button data-testid="delete-button" onClick={() => onClickDelete(todo)}> Delete </button>
            </span>
        </>
    )

    const notDoneInfo = (
        <>
            <span>
              This todo is not done
            </span>
            <span>
              <button data-testid="delete-button" onClick={() => onClickDelete(todo)}> Delete </button>
              <button data-testid="complete-button" onClick={() => onClickComplete(todo)}> Set as done </button>
            </span>
        </>
    )

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '70%', margin: 'auto' }}>
            <span>
              {todo.title} 
            </span>
            {todo.completed ? doneInfo : notDoneInfo}
        </div>
    )
}

export default TodoItem;