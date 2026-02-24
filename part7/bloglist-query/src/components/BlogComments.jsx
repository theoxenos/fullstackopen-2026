import { Card, Col } from "react-bootstrap";

const BlogComments = ({ comments }) => {
    return (
        <Col md={6}>
            {comments?.map((comment, index) => (
                <Card key={index} className="mb-3">
                    <Card.Body>
                        {comment}
                        <div className="text-muted" style={{ fontSize: '0.8rem' }}>Posted by Anonymous</div>
                    </Card.Body>
                </Card>
            ))}
        </Col>
    )
};

export default BlogComments;