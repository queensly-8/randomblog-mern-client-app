import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import DeleteBlog from '../components/DeleteB'; // Import DeleteBlog component
import UpdateBlog from './AddComment';

export default function GetBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const navigate = useNavigate();

    // Fetch blogs from API
    const fetchBlogs = () => {
      fetch(`${process.env.REACT_APP_API_URL}/blog/getBlogAll`, {
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
          if (Array.isArray(data.Blogs)) { // Access data.Blogs instead of data.blogs
            setBlogs(data.Blogs); // Set the blogs state with data.Blogs
          } else {
            Swal.fire({
              title: "Error",
              icon: "error",
              text: "Unexpected data format. Please try again."
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching blogs:", error);
          Swal.fire({
            title: "Error",
            icon: "error",
            text: "Failed to fetch blog data. Please try again."
          });
        });
    };
    // Fetch blogs on component mount and set interval for periodic fetching
    useEffect(() => {
        fetchBlogs();
        const intervalId = setInterval(fetchBlogs, 5000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            {blogs.map((blog) => (
                <Card key={blog._id} border="primary" style={{ width: '50rem', margin: '1rem' }}>
                    <Card.Header>Blog Details</Card.Header>
                    <Card.Body>
                        <Card.Title>{blog.title}</Card.Title>
                        <Card.Text>
                            Author: {blog.author[0].name}<br />
                            Content: {blog.content}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="p-3">
                        <UpdateBlog blogId={blog._id} onCommentSuccess={fetchBlogs}/>
                        <DeleteBlog blogId={blog._id} onDeleteSuccess={fetchBlogs} /> {/* Use DeleteBlog component */}
                    </Card.Footer>
                </Card>
            ))}

            {/* Modal for displaying blog details */}
            {selectedBlog && (
                <Modal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Blog Details
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>{selectedBlog.title}</h4>
                        <p>
                            <strong>Author:</strong> {selectedBlog.author[0].name}<br />
                            <strong>Content:</strong> {selectedBlog.content}<br />
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => setModalShow(false)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
}
