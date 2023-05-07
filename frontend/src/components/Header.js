import React, { useRef, useState } from "react";
import axios from "axios";
import { Navbar, Button, Nav, NavDropdown, Container } from "react-bootstrap";
import "../CSS/Navigation.css";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout} from "../features/userSlice";
import logo from "../resources/Logo.png";
import { useNavigate } from "react-router-dom";

function Navigation() {
  const history = useNavigate();
  const user = useSelector((state) => state.user);


  const dispatch = useDispatch();

  function handleLogout() {
    history("/login");
    dispatch(logout());
  }
 


  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <img src={logo} alt="Logo" width={110} height={110} />
        </LinkContainer>
       Your travel Partner🌍🗺️✈️
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* if no user*/}
          
            {!user && (
              <LinkContainer to="/Signin">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}
               
           
            {/* if user*/}
            {user && (
              <>
              <LinkContainer to="/usertypes">
          <NavDropdown.Item>Not A Customer? 🤨</NavDropdown.Item>
      </LinkContainer>
              <NavDropdown title={`${user.email}`} id="basic-nav-dropdown">
              {user.isSeller ? (
                 <>
                    <LinkContainer to="/userdash">
                 <NavDropdown.Item>Your Dashboard</NavDropdown.Item>
                </LinkContainer>
                   <LinkContainer to="/sellerdash">
                   <NavDropdown.Item>Dashboard</NavDropdown.Item>
                   </LinkContainer>
            
                  </>
                  ) : user.isTravel ? (
                   <>
                      <LinkContainer to="/userdash">
                 <NavDropdown.Item>Your Dashboard</NavDropdown.Item>
                </LinkContainer>
                 <LinkContainer to="/travel">
                 <NavDropdown.Item>Book a Trip</NavDropdown.Item>
                </LinkContainer>
                 </>
                ) : user.isDest ? (
                 <>
                    <LinkContainer to="/userdash">
                 <NavDropdown.Item>Your Dashboard</NavDropdown.Item>
                </LinkContainer>
             <LinkContainer to="/dest">
            <NavDropdown.Item>Explore Destinations</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to="/addest">
            <NavDropdown.Item>Add Destinations</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to="/onlydestcomp">
            <NavDropdown.Item>View My Post</NavDropdown.Item>
          </LinkContainer>
           </>
        ) : user.isHotel ? (
        <>
           <LinkContainer to="/userdash">
                 <NavDropdown.Item>Your Dashboard</NavDropdown.Item>
                </LinkContainer>
        <LinkContainer to="/hotel">
          <NavDropdown.Item>Book a Hotel</NavDropdown.Item>
        </LinkContainer>
      </>
      ) : user.isAdmin ?(
      <>
      <LinkContainer to="/admindashboard">
            <NavDropdown.Item>Admin Dashboard</NavDropdown.Item>
          </LinkContainer>
       <LinkContainer to="/dest">
            <NavDropdown.Item>Explore Destinations</NavDropdown.Item>
          </LinkContainer>
          
    </>
  ):(
<>
                  <LinkContainer to="/userdash">
                 <NavDropdown.Item>Your Dashboard</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/dest">
            <NavDropdown.Item>Explore Destinations</NavDropdown.Item>
          </LinkContainer>
</>
   )}


              

                <NavDropdown.Divider />
                <Button
                  variant="danger"
                  onClick={handleLogout}
                  className="logout-btn"
                >
                  Logout
                </Button>
              </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
        </Navbar>
  );
}

export default Navigation;
