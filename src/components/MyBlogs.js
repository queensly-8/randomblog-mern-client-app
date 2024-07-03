import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Modal, Button, Card } from "react-bootstrap";
import DeleteBlog from '../components/DeleteB';
import UpdateBlog from "./UpdateBlog";

export default function GetMyBlogs(){
    const [blogs, setBlogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);

    const fetchMyBlog=()=>{
        fetch(`${process.env.REACT_APP_API_URL}/blog/getMyBlog`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res)=>{
            if(!res.ok){
                throw new Error ("Failed to fetch")
            }
            return res.json();
        })
        .then((data)=>{
            if(data && Array.isArray(data)){
                setBlogs(data);
            }else{
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
    }
    useEffect(()=>{
        fetchMyBlog();
        const intervalId = setInterval(fetchMyBlog, 5000);
        return () => clearInterval(intervalId);
    },[]);

    return(
<div>
            {blogs.map((blog) => (
                <Card key={blog._id} border="primary" style={{ width: '50rem', margin: '1rem' }}>
                    <Card.Header>Blog Details</Card.Header>
                    <Card.Body>
                        <Card.Title>{blog.title}</Card.Title>
                        <Card.Text>
                            <strong>Author:</strong> {blog.author[0].name}<br />
                           <strong> Content:</strong> {blog.content}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="p-3">
                        <UpdateBlog blogId={blog._id} onUpdateSuccess={fetchMyBlog}/>
                        <DeleteBlog blogId={blog._id} onDeleteSuccess={fetchMyBlog} /> {/* Use DeleteBlog component */}
                    </Card.Footer>
                </Card>
            ))}

            {/* Modal for displaying blog details
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
            )} */}
        </div>
    );
}
