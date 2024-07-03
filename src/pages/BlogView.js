import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, Card, Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import im from '../images/Random.png';

export default function BlogView() {
    const [blog, setBlog] = useState(null);

    // Fetch blog from API
    const fetchBlog = () => {
        const blogId = localStorage.getItem('selectedBlogId');
        if (!blogId) {
            console.error("No blogId found in localStorage");
            return;
        }

        fetch(`${process.env.REACT_APP_API_URL}/blog/getBlog/${blogId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to fetch blog data");
            }
            return res.json();
        })
        .then((data) => {
            if (data) {
                setBlog(data); // Set the blog state with the fetched data
            } else {
                throw new Error("Unexpected data format");
            }
        })
        .catch((error) => {
            console.error("Error fetching blog:", error);
            // Handle error with a message to the user
        });
    };

    // Fetch blog on component mount
    useEffect(() => {
        fetchBlog();
    }, []); // Fetch blog only once on mount

    if (!blog) {
        return <p>Loading...</p>; // Render loading state while fetching blog
    }

    return (
        <div>
            <Navbar className="navbar">
                <Container>
                    <Navbar.Brand href="#home">
                        <img
                            src={im}
                            width="150"
                            height="150"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                    <Nav className="navlink justify-content-center">
                        <Link as={Nav.Link} className="nav-link" to="/">
                            Home
                        </Link>
                        <Link as={Nav.Link} className="nav-link" to="/login">
                            Login
                        </Link>
                        <Link as={Nav.Link} className="nav-link" to="/register">
                            Register
                        </Link>
                    </Nav>
                </Container>
            </Navbar>

            <div className="site-content">
                <div className="ast-container">
                    <div className="content-area primary">
                        <main className="site-main">
                            <Card className="mb-4">
                                <Card.Body>
                                    <div className="post-thumb-img-content post-thumb">
                                        <img
                                            src={im}
                                            className="img"
                                            alt="Blog Thumbnail"
                                        />
                                    </div>
                                    <h1 className="title">{blog.title}</h1>
                                    <div className="d-flex align-items-center mb-3">
                                        <span className="comments-link">
                                            <a href="#">Leave a Comment</a>
                                        </span>
                                        <span className="ml-3">/ By {blog.author[0].name}</span>
                                    </div>
                                    <div className="entry-content">
                                        <p>{blog.content}</p>
                                    </div>
                                </Card.Body>
                            </Card>

              <Card className="comment-card">
                <Card.Body>
                  <Card.Title className="ctitle d-flex align-items-right">
                    Leave a Comment
                  </Card.Title>
                  <Form>
                    <Form.Group className='mb-3'>
                      <Form.Control
                        as="textarea"
                        id="comment"
                        placeholder="Type here.."
                        rows={8}
                        aria-required="true"
                      />
                    </Form.Group>
                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Control
                            id="author"
                            name="author"
                            type="text"
                            placeholder="Name*"
                            aria-required="true"
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Control
                            id="email"
                            name="email"
                            type="text"
                            placeholder="Email*"
                            aria-required="true"
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Control
                            id="url"
                            name="url"
                            type="text"
                            placeholder="Website"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-3 mt-3 d-flex align-items-start">
                      <Form.Check
                        type="checkbox"
                        id="wp-comment-cookies-consent"
                        label="Save my name, email, and website in this browser for the next time I comment."
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        id="submit"
                      >
                        Post Comment »
                      </button>
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>

                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
}
