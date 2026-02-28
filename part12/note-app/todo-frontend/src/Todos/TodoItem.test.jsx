import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import TodoItem from './TodoItem'

test('renders todo title and status text', () => {
  const todo = {
    title: 'Testing React components',
    completed: false
  }

  // Mock functions for the props
  const mockDelete = vi.fn()
  const mockComplete = vi.fn()

  render(
    <TodoItem 
      todo={todo} 
      onClickDelete={() => mockDelete} 
      onClickComplete={() => mockComplete} 
    />
  )

  // Check if title is present
  expect(screen.getByText('Testing React components')).toBeInTheDocument()
  
  // Check if status text for "not done" is present
  expect(screen.getByText('This todo is not done')).toBeInTheDocument()
})

describe('button tests', () => {
  test('delete gets called on click delete button', () => {
    const todo = {
      title: 'Testing React components',
      completed: false,
    };

    const mockDelete = vi.fn();
    const mockComplete = vi.fn();

    render(
        <TodoItem
            todo={todo}
            onClickDelete={mockDelete}
            onClickComplete={mockComplete}
        />
    );

    // Prefer role‑based query for better resilience and accessibility
    const completeButton = screen.getByTestId('complete-button');
    const deleteButton = screen.getByRole('button', { name: /delete/i });

    // Trigger the click via RTL utilities
    fireEvent.click(deleteButton);
    // Or, if you have userEvent:
    // await userEvent.click(deleteButton);

    expect(completeButton).toBeInTheDocument();
    // Verify the handler was called once with the expected payload
    expect(mockDelete).toHaveBeenCalledTimes(1);
    expect(mockDelete).toHaveBeenCalledWith(todo);
  });

  test('complete button disappears after click complete button', () => {
    const todo = {
      title: 'Testing React components',
      completed: false,
    };

    const mockDelete = vi.fn();
    const mockComplete = vi.fn( () => todo.completed = true);

    const {rerender} = render(
        <TodoItem
            todo={todo}
            onClickDelete={mockDelete}
            onClickComplete={mockComplete}
        />
    );

    const completeButton = screen.getByTestId('complete-button');

    expect(completeButton).toBeInTheDocument();

    fireEvent.click(completeButton);

    rerender(
        <TodoItem
            todo={todo}
            onClickDelete={mockDelete}
            onClickComplete={mockComplete}
        />
    )

    expect(completeButton).not.toBeInTheDocument();
    // Verify the handler was called once with the expected payload
    expect(mockComplete).toHaveBeenCalledTimes(1);
    expect(mockComplete).toHaveBeenCalledWith(todo);
  })
})