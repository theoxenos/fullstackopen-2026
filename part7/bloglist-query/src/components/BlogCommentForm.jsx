import { useCreateCommentMutation } from "../queries/blog.js";
import { Button, Form, InputGroup } from "react-bootstrap";

const BlogCommentForm = ({blogId}) => {
    const createCommentMutation = useCreateCommentMutation();

    const handleSubmit = (e) => {
        e.preventDefault();
        const comment = e.target.elements.comment.value;
        
        createCommentMutation.mutate({id: blogId, comment});
        
        e.target.reset();
    };

    return (
        <Form onSubmit={handleSubmit} className="mb-3">
            <InputGroup>
                <Form.Control type="text" name="comment"/>
                <Button type="submit">add comment</Button>
            </InputGroup>
        </Form>
    );
};

export default BlogCommentForm;