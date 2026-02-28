import React, {useState} from 'react'

const TodoForm = ({createTodo}) => {
    const [title, setTitle] = useState('')

    const styleBorder = {
        borderRadius: '10px',
    }

    const styleBorderNoEnd = {
        ...styleBorder,
        borderEndEndRadius: 0,
        borderStartEndRadius: 0,
        borderRight: 0
    }

    const styleBorderNoStart = {
        ...styleBorder,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderLeft: 0
    }

    const onChange = ({target}) => {
        setTitle(target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        createTodo({title})
    }

    return (
        <form onSubmit={handleSubmit}>
            <input style={styleBorderNoEnd} type="text" name="title" value={title} onChange={onChange}/>
            <button style={styleBorderNoStart} type="submit"> Submit</button>
        </form>
    )
}

export default TodoForm
