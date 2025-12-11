//import react and hook
import React, { useState, useEffect } from "react";

//import component react bootstrap
import {
    Navbar,
    Container,
    Nav,
    NavDropdown,
    Modal
} from 'react-bootstrap';

//import react router dom
import {
    Link,
    useNavigate
} from "react-router-dom";

//import BASE URL API
import Api from "../../api";

//import js cookie
import Cookies from "js-cookie";

function WebHeader() {

    //state categories
    const [categories, setCategories] = useState([]);

    //state user logged in
    const [user, setUser] = useState({});

    //modal search
    const [modal, setModal] = useState(false);

    //state keyword
    const [keyword, setKeyword] = useState("");

    //navigate
    const navigate = useNavigate();

    //token
    const token = Cookies.get("token");

    //function "fetchDataCategories"
    const fetchDataCategories = async () => {
        try {
            const response = await Api.get('/api/web/categories');

            setCategories(response?.data?.data || []); // ← aman
        } catch (error) {
            console.error("Categories API error:", error);
            setCategories([]); // fallback aman
        }
    }

    //function "fetchDataUser"
    const fetchDataUser = async () => {
        try {
            const response = await Api.get('/api/admin/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            setUser(response?.data || {});
        } catch (error) {
            console.error("User API error:", error);
            setUser({});
        }
    }

    //hook
    useEffect(() => {
        fetchDataCategories();

        if (token) {
            fetchDataUser();
        }

    }, []);

    const searchHandler = () => {
        navigate(`/search?q=${keyword}`);
        setModal(false);
    }

    return (
        <React.Fragment>
            <Navbar collapseOnSelect expand="lg" className="navbar-custom shadow-sm" fixed="top">
                <Container>
                    <Navbar.Brand as={Link} to="/" className="fw-bold text-white"><i className="fa fa-map-marked-alt"></i> TRAVEL GIS</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">

                        <NavDropdown
                            title={
                                <span className="text-white fw-bold">
                                <i className="fa fa-list-ul"></i> CATEGORIES
                                </span>
                            }
                            id="collasible-nav-dropdown"
                        >
                            {(categories || []).map((category) => (
                                <NavDropdown.Item
                                    as={Link}
                                    to={`/category/${category.slug}`}
                                    key={category.id}
                                >
                                    <img src={category.image} style={{ width: "35px" }} alt="" />{" "}
                                    {category.name?.toUpperCase()}
                                </NavDropdown.Item>
                            ))}

                            <NavDropdown.Divider />

                            <NavDropdown.Item as={Link} to="/places">
                                LIHAT LAINNYA <i className="fa fa-long-arrow-alt-right"></i>
                            </NavDropdown.Item>
                        </NavDropdown>

                        <Nav.Link as={Link} to="/places" className="fw-bold text-white"><i className="fa fa-globe-asia"></i> PLACES</Nav.Link>
                        <Nav.Link as={Link} to="/maps" className="fw-bold text-white"><i className="fa fa-map"></i> MAPS</Nav.Link>
                    </Nav>

                    <Nav>
                        <Nav.Link onClick={() => setModal(true)} className="fw-bold text-white me-4"><i className="fa fa-search"></i> SEARCH</Nav.Link>

                        {token 
                            ? <Link to="/admin/dashboard" className="btn btn-md btn-light text-uppercase"><i className="fa fa-user-circle"></i> {user?.name}</Link>
                            : <Link to="/admin/login" className="btn btn-md btn-light"><i className="fa fa-lock"></i> LOGIN</Link>
                        }
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Modal
                size="lg"
                show={modal}
                onHide={() => setModal(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    <i className="fa fa-search"></i> SEARCH
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && searchHandler()} placeholder="find your destination here..." />
                        <button onClick={searchHandler} type="submit" className="btn btn-md btn-success"><i className="fa fa-search"></i> SEARCH</button>
                    </div>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
}

export default WebHeader;
