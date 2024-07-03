import { Modal, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

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
            Update Movie
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="Enter your Blog comment"
                value={props.title}
                onChange={props.onCommentChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button onClick={props.onAddComment}>Add</Button>
        </Modal.Footer>
      </Modal>
    );
  }


  export default function UpdateBlog({ blogId, onCommentSuccess }) {
    const [modalShow, setModalShow] = useState(false);
    const [comment, setComment] = useState('');
  
    // Handle adding comment
    const handleAddComment = () => {
      fetch(`${process.env.REACT_APP_API_URL}/blog/addComment/${blogId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ comment })
      })
        .then(res => {
          if (!res.ok) {
            throw new Error('Failed to add comment');
          }
          return res.json();
        })
        .then(data => {
          setModalShow(false);
          onCommentSuccess(); // Refresh blog after adding comment
          Swal.fire({
            title: 'Success',
            icon: 'success',
            text: 'Comment added successfully.'
          });
        })
        .catch(error => {
          console.error('Error adding comment:', error);
          Swal.fire({
            title: 'Error',
            icon: 'error',
            text: 'Failed to add comment. Please try again.'
          });
        });
    };
  
    return (
      <div>
        <Button variant="warning m-2" onClick={() => setModalShow(true)}>Add Comment</Button>
        
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          comment={comment}
          onCommentChange={(e) => setComment(e.target.value)}
          onAddComment={handleAddComment}
        />
      </div>
    );
  }