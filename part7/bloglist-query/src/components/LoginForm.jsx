import { Button, Col, Form, Row } from "react-bootstrap";

const LoginForm = ({ onLoginFormSubmit }) => {
    return (
        <Row className="justify-content-md-center">
            <Col lg={4} md={6} sm={8} xs={12}>
                <Form onSubmit={onLoginFormSubmit}>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label htmlFor="username" column>Username </Form.Label>
                        <Form.Control type="text" placeholder="Username" id="username" name="username"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label htmlFor="password" column>Password </Form.Label>
                        <Form.Control type="password" placeholder="Password" id="password" name="password"/>
                    </Form.Group>
                    <Button type="submit">Login</Button>
                </Form>
            </Col>
        </Row>
    );
};

export default LoginForm;
