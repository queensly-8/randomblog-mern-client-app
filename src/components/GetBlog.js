export default GetBlog()=>{

const [blog, setBlog] = useState(null);

  // Fetch blog from API
  const fetchBlog = () => {
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
  }, [blogId]); // Re-fetch blog when blogId changes

  if (!blog) {
    return <p>Loading...</p>; // Render loading state while fetching blog
  }

  return (
    <div>
      <div className="site-content">
        <div className="ast-container">
          <div className="content-area primary">
            <main className="site-main">
              <Card className="mb-4">
                <Card.Body>
                  <div className="post-thumb-img-content post-thumb">
                    <img
                      src={im}
                      className="img-fluid"
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
            </main>
        </div>
    </div>
</div>
</div>
  )
}
