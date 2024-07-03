import React, { useState, useEffect, useContext } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "./../UserContext";
import im from '../images/Random.png';
import '../index.css'

const Login = () => {
    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();

    function authenticate(e) {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
            credentials: "include", // Send cookies and authorization headers
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Authentication failed");
                }
                return res.json();
            })
            .then((data) => {
                localStorage.setItem("token", data.access);
                retrieveUserDetails(data.access).then((userDetails) => {
                    setUser({
                        id: userDetails._id,
                        isAdmin: userDetails.isAdmin,
                    });
    
                    Swal.fire({
                        title: "Login Successful",
                        icon: "success",
                        text: "Welcome to Random Blogs!",
                    }).then(() => {
                        if (userDetails.isAdmin) {
                            navigate("/admin");
                        } else {
                            navigate("/user");
                        }
                    });
                });
            })
            .catch((error) => {
                console.error("Error during authentication:", error); // Log the error for debugging
                Swal.fire({
                    title: "Authentication Failed",
                    icon: "error",
                    text: "Check your login details and try again",
                });
            });
    
        setEmail("");
        setPassword("");
    }
    

    const retrieveUserDetails = (token) => {
        return fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: "include", // Send cookies and authorization headers
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to retrieve user details");
                }
                return res.json();
            })
            .catch((error) => {
                console.error("Error retrieving user details:", error);
            });
    };

    useEffect(() => {
        setIsActive(email !== "" && password !== "");
    }, [email, password]);

    return (
        <>
        <Navbar className="navbar">
        <Container>
            <Navbar.Brand href="#home">
                <img
                    src={im}
                    width="150"
                    height="150"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                />
            </Navbar.Brand>
            <Nav className="navlink justify-content-center">
                <Link as={Nav.Link} className="nav-link" to="/">
                    Home
                </Link>
                <Link as={Nav.Link} className="nav-link" to="/register">
                    Register
                </Link>
            </Nav>
        </Container>
        </Navbar>
        <div className="container1">
            <div className="header">
                <div className="text">Login</div>
                <div className="create">
                    Don't have an account yet?{" "}
                    <Link to="/register">Create Now</Link>
                </div>
            </div>
            <form onSubmit={authenticate}>
                <div className="inputs">
                    <div className="input">
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="submit-container d-flex justify-content-center">
                    <button
                        className="submit "
                        type="submit"
                        disabled={!isActive}
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
        </>
    );
};

export default Login;
