import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const BlogForm = ({ onCreateBlog }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        onCreateBlog({
            title,
            author,
            url
        });

        setTitle('');
        setAuthor('');
        setUrl('');
    };

    return (
        <div className="col-6">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label column>Title:</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="author">
                    <Form.Label column>Author:</Form.Label>
                    <Form.Control
                        type="text"
                        name="author"
                        value={author}
                        onChange={e => setAuthor(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="url">
                    <Form.Label column>Url:</Form.Label>
                    <Form.Control
                        type="text"
                        name="url"
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                    />
                </Form.Group>

                <Button variant="success" type="submit">Submit</Button>
            </Form>
        </div>
    );
};

export default BlogForm;
