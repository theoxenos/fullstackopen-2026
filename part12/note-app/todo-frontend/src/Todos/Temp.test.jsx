import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import TodoItem from './TodoItem';
import { describe, it, expect, vi } from 'vitest';

describe('TodoItem', () => {
    const defaultTodo = {
        title: 'Testing React components',
        completed: false,
    };

    const createMocks = () => ({
        onClickDelete: vi.fn(),
        onClickComplete: vi.fn(),
    });

    describe('rendering', () => {
        it('should render todo title', () => {
            const mocks = createMocks();

            render(
                <TodoItem
                    todo={defaultTodo}
                    onClickDelete={mocks.onClickDelete}
                    onClickComplete={mocks.onClickComplete}
                />
            );

            expect(screen.getByText('Testing React components')).toBeInTheDocument();
        });

        it('should display "not done" status when todo is incomplete', () => {
            const mocks = createMocks();

            render(
                <TodoItem
                    todo={defaultTodo}
                    onClickDelete={mocks.onClickDelete}
                    onClickComplete={mocks.onClickComplete}
                />
            );

            expect(screen.getByText('This todo is not done')).toBeInTheDocument();
        });

        it('should display "done" status when todo is completed', () => {
            const completedTodo = { ...defaultTodo, completed: true };
            const mocks = createMocks();

            render(
                <TodoItem
                    todo={completedTodo}
                    onClickDelete={mocks.onClickDelete}
                    onClickComplete={mocks.onClickComplete}
                />
            );

            expect(screen.getByText('This todo is done')).toBeInTheDocument();
        });
    });

    describe('interactions', () => {
        it('should call onClickDelete when delete button is clicked', async () => {
            const user = userEvent.setup();
            const mocks = createMocks();

            render(
                <TodoItem
                    todo={defaultTodo}
                    onClickDelete={mocks.onClickDelete}
                    onClickComplete={mocks.onClickComplete}
                />
            );

            const deleteButton = screen.getByRole('button', { name: /delete/i });
            await user.click(deleteButton);

            expect(mocks.onClickDelete).toHaveBeenCalledTimes(1);
            expect(mocks.onClickDelete).toHaveBeenCalledWith(defaultTodo);
        });

        it('should call onClickComplete when complete button is clicked', async () => {
            const user = userEvent.setup();
            const mocks = createMocks();

            render(
                <TodoItem
                    todo={defaultTodo}
                    onClickDelete={mocks.onClickDelete}
                    onClickComplete={mocks.onClickComplete}
                />
            );

            const completeButton = screen.getByRole('button', { name: /set as done/i });
            await user.click(completeButton);

            expect(mocks.onClickComplete).toHaveBeenCalledTimes(1);
            expect(mocks.onClickComplete).toHaveBeenCalledWith(defaultTodo);
        });

        it('should not call any handlers on initial render', () => {
            const mocks = createMocks();

            render(
                <TodoItem
                    todo={defaultTodo}
                    onClickDelete={mocks.onClickDelete}
                    onClickComplete={mocks.onClickComplete}
                />
            );

            expect(mocks.onClickDelete).not.toHaveBeenCalled();
            expect(mocks.onClickComplete).not.toHaveBeenCalled();
        });
    });
});
