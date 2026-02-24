import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import blogService from "../services/blog-service.js";
import { Card, Row } from "react-bootstrap";

const BlogsList = () => {

    const { data: blogs, ...blogQuery } = useQuery({
        queryKey: ['blogs'],
        queryFn: blogService.getAllBlogs
    });

    if (blogQuery.isError) {
        return <div>Error loading blogs</div>;
    }

    if (blogQuery.isLoading) {
        return <div>Loading...</div>;
    }

    const blogListStyle = {
        border: '1px solid black',
        fontSize: '1.5rem',
        marginBottom: '0.5rem',
        padding: '0.5rem',
    }
    
    return (
        <Row lg="4" md="3" sm="2" xs="1">
            {blogs.map((blog) => (
                <Card key={blog.id} style={blogListStyle}>
                    <Card.Header>{blog.title}</Card.Header>
                    <Card.Body>
                        <Card.Text>{blog.author}</Card.Text>
                        <Link to={`/blogs/${blog.id}`}>Read More</Link>
                    </Card.Body>
                </Card>
            ))}
        </Row>
    );
};

export default BlogsList;
