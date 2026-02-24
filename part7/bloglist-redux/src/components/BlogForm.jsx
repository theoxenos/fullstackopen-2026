import { useState } from 'react';

const BlogForm = ({ onCreateBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    onCreateBlog({
      title,
      author,
      url,
    });

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input id="title" name="title" type="text" onInput={e => setTitle(e.target.value)} />
        </div>
        <div>
          <label htmlFor="author">Author: </label>
          <input id="author" name="author" type="text" onInput={e => setAuthor(e.target.value)} />
        </div>
        <div>
          <label htmlFor="url">Url: </label>
          <input id="url" name="url" type="text" onInput={e => setUrl(e.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BlogForm;
