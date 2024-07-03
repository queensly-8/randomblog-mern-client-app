import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

function AddBlog() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [authorDetails, setAuthorDetails] = useState('');
    const [error, setError] = useState('');
    const [isActive, setIsActive] = useState(false);

    const addBlog = (e) => {
        e.preventDefault();

        const formData = {
            title,
            content,
            author: [{ name: authorName, details: authorDetails }],
            comments: []  // Empty array for comments
        };

        fetch(`${process.env.REACT_APP_API_URL}/blog/addBlog`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (!data.error) {
                setTitle('');
                setContent('');
                setAuthorName('');
                setAuthorDetails('');
                alert("Blog Added");
                setError('');
            } else {
                console.error('Error adding blog:', data.error);
                setError(data.message || "Something went wrong");
            }
        })
        .catch(error => {
            console.error('Error adding blog:', error);
            setError("Failed to add blog. Please try again.");
        });
    };

    useEffect(() => {
        setIsActive(title !== "" && content !== "" && authorName !== "" && authorDetails !== "");
    }, [title, content, authorName, authorDetails]);

    return (
        <Form onSubmit={addBlog}>
            <Form.Group className="mb-3" controlId="formBlogTitle">
                <Form.Label>Blog Title</Form.Label>
                <Form.Control
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    autoFocus
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBlogContent">
                <Form.Label>Content</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={5}
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAuthorName">
                <Form.Label>Author Name</Form.Label>
                <Form.Control
                    type="text"
                    value={authorName}
                    onChange={e => setAuthorName(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAuthorDetails">
                <Form.Label>Author Details</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={authorDetails}
                    onChange={e => setAuthorDetails(e.target.value)}
                />
            </Form.Group>
            <Button type="submit" disabled={!isActive}>Add Blog</Button>
            {error && <p>{error}</p>}
        </Form>
    );
}

export default AddBlog;
