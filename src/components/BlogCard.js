import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import im from '../../src/images/Random.png';

export default function GetBlogs() {
    const [blogs, setBlogs] = useState([]);
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
            if (Array.isArray(data.Blogs)) {
                setBlogs(data.Blogs);
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

    // Function to handle navigation to BlogView page with blogId
    const handleGoToBlogView = (blogId) => {
        localStorage.setItem('selectedBlogId', blogId);
        navigate('/blogview');
    };

    return (
<div className='container'>
    <div className='row'>
        {blogs.map((blog, index) => (
            <div className="col-md-4 d-flex" key={blog._id} style={{ margin: '1rem 0' }}>
                <div className="card" style={{ width: '100%' }}>
                    <img src={im} alt={blog.title} />
                    <div className="card-content">
                        <h2 className="card-title">{blog.title}</h2>
                        <p className="card-text">
                            Author: {blog.author[0].name}<br />
                            Content: {blog.content}
                        </p>
                    </div>
                    <div className="card-footer">
                        {/* Use onClick to trigger navigation */}
                        <Button variant="primary" onClick={() => handleGoToBlogView(blog._id)}>
                            Read More >>
                        </Button>
                    </div>
                </div>
            </div>
        ))}
    </div>
</div>
    );
}
