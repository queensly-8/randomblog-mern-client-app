import { Card, Nav } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import NavAdmin from '../components/UANav'
import AddBlog from '../components/AddBlog'
import CardBlog from '../components/CardBlog'
import Name from '../components/LoggedOn'
import MyBlogs from '../components/MyBlogs';
// import AllMovies from '../components/CardMovies'

export default function Admin(){

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
                      <Nav.Link eventKey="#add">Add Blog</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="#pending">All Blogs</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="#comp">
                        MyBlogs
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
                  <CardBlog />
                  </div>
                  {/* Content for the Disabled tab */}
                  <div id="comp" style={{ display: activeTab === "#comp" ? 'block' : 'none' }}>
                  <MyBlogs />
                  </div>
                </Card.Body>
              </Card>
              {/* <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
              /> */}
              <br />
            </div>
          </div>
        </div>
        </>
    )
}