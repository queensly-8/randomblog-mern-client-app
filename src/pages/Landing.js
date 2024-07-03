import React from 'react';
import { Navbar, Container, Nav} from 'react-bootstrap';
import '../index.css';
import LandingNavbar from '../components/Navbar';
import Card from '../components/BlogCard';

const Landing = () => {
    return (
        <>
        <section className="section main-banner" id="top" data-section="section1">

           <div className="container-fluid" id="landing">
            <LandingNavbar />
                    <div className="row" id="landing-content">
                        <div className="col-md-12 text-light d-flex justify-content-center align-items-center">
                            <h1 id="title" className="text">Read Random Blog Post</h1>
                            </div>
                            <div className="col-md-12 d-flex justify-content-center align-items-center">
                            
                        </div>
                    </div>
                </div>
            </section>

            <div className='blog-container d-flex flex-column align-items-center'>
            <div className="blog-title-container">
                <h1 className="blog-title my-5">Blog Posts</h1>
            </div>
            <div className="card-container d-flex justify-content-center col-md-12">
                <Card />
            </div>
            </div>
            <footer className='landing-footer'>
                <div className="container">
                    <div className="row">
                        <div className="d-flex justify-content-center text-light m-2">
                            <p className='text-dark mt-2'>@ Copyright 2024 by RandomBlogs 
                            | Design: Des</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Landing;
