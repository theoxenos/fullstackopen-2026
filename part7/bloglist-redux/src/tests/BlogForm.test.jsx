import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from '../components/BlogForm';

test('Form calls event handler with right details', async () => {
  const sampleBlog = {
    title: 'Testing React Components',
    author: 'A. Author',
    url: 'https://example.com/blog/testing-react',
  };

  const mockHandler = vi.fn();

  const { container } = render(<BlogForm onCreateBlog={mockHandler} />);

  const form = container.querySelector('form');
  const titleInput = form.querySelector('input#title');
  const authorInput = form.querySelector('input#author');
  const urlInput = form.querySelector('input#url');

  const user = userEvent.setup();

  await user.type(titleInput, sampleBlog.title);
  await user.type(authorInput, sampleBlog.author);
  await user.type(urlInput, sampleBlog.url);

  await user.click(form.querySelector('button'));

  expect(mockHandler).toHaveBeenCalled();
  expect(mockHandler).toHaveBeenCalledWith(sampleBlog);
});
