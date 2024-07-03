import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';

// Modal component for updating workout
function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Blog
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={props.title}
                onChange={props.onTitleChange}
              />
            </Form.Group>
            <Form.Group controlId="formContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter content"
                value={props.content}
                onChange={props.onContentChange}
              />
            </Form.Group>
            <Form.Group controlId="formAuthorName">
              <Form.Label>Author Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author name"
                value={props.authorName}
                onChange={props.onAuthorNameChange}
              />
            </Form.Group>
            <Form.Group controlId="formAuthorDescription">
              <Form.Label>Author Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author description"
                value={props.authorDescription}
                onChange={props.onAuthorDescriptionChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button onClick={props.onUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  

export default function UpdateBlog({ blogId, onUpdateSuccess }) {
    const [modalShow, setModalShow] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [authorDescription, setAuthorDescription] = useState('');
  
    const handleUpdateClick = () => {
      fetch(`${process.env.REACT_APP_API_URL}/blog/getBlog/${blogId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(res => {
          if (!res.ok) {
            throw new Error('Failed to fetch blog data');
          }
          return res.json();
        })
        .then(data => {
          const blog = data;
          setTitle(blog.title);
          setContent(blog.content);
          setAuthorName(blog.author[0].name);
          setAuthorDescription(blog.author[0].details);
          setModalShow(true);
        })
        .catch(error => {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: "Failed to fetch blog data. Please try again."
          });
        });
    };
  
    const handleUpdateSubmit = () => {
      fetch(`${process.env.REACT_APP_API_URL}/blog/updateBlog/${blogId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          title,
          content,
          authorName,
          authorDescription
        })
      })
        .then(res => {
          if (!res.ok) {
            throw new Error('Failed to update blog');
          }
          return res.json();
        })
        .then(data => {
          setModalShow(false);
          Swal.fire({
            title: "Success",
            icon: "success",
            text: "Blog updated successfully."
          });
          onUpdateSuccess(); // Call the parent component's success handler
        })
        .catch(error => {
          console.error('Error updating blog:', error);
          Swal.fire({
            title: "Error",
            icon: "error",
            text: "Failed to update blog. Please try again."
          });
        });
    };
  
    return (
      <>
        <Button variant="warning m-2" onClick={handleUpdateClick}>
          Update
        </Button>
  
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          title={title}
          content={content}
          authorName={authorName}
          authorDescription={authorDescription}
          onTitleChange={(e) => setTitle(e.target.value)}
          onContentChange={(e) => setContent(e.target.value)}
          onAuthorNameChange={(e) => setAuthorName(e.target.value)}
          onAuthorDescriptionChange={(e) => setAuthorDescription(e.target.value)}
          onUpdate={handleUpdateSubmit}
        />
      </>
    );
  }
