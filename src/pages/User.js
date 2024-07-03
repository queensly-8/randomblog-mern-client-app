import { Card, Nav } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import NavAdmin from '../components/UANav'
import AddBlog from '../components/AddBlog';
import Name from '../components/LoggedOn'
import UserCard from '../components/UserCard'
import MyBlogs from '../components/MyBlogs';

export default function User(){

    const [modalShow, setModalShow] = useState(false);
    const [activeTab, setActiveTab] = useState("#first");
  
    const handleTabSelect = (selectedTab) => {
      setActiveTab(selectedTab);
    };

    return (
        <>
        <NavAdmin />
        <Name />
        <div className="container-fluid">
          <div className="row">
            <div className="d-flex justify-content-center col-md-12 text-light text-center">
              <Card>
                <Card.Header>
                  <Nav variant="tabs" defaultActiveKey="#first" onSelect={handleTabSelect}>
                    <Nav.Item>
                      <Nav.Link eventKey="#add">User Add Blog</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="#pending">All Blogs</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="#comp">
                        My Blogs
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Card.Header>
                <Card.Body>
                  {/* Content for the Active tab */}
                  <div id="add" style={{ display: activeTab === "#add" ? 'block' : 'none' }}>
                    <AddBlog />
                  </div>
                  {/* Content for the Link tab */}
                  <div id="pending" style={{ display: activeTab === "#pending" ? 'block' : 'none' }}>
                  <UserCard />
                  </div>
                  {/* Content for the Disabled tab */}
                  <div id="comp" style={{ display: activeTab === "#comp" ? 'block' : 'none' }}>
                  <MyBlogs />
                  </div>
                </Card.Body>
              </Card>
              <br />
            </div>
          </div>
        </div>
        </>
    )
}