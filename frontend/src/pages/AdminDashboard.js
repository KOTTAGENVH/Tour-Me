import React from "react";
import { Container, Nav, Tab, Col, Row } from "react-bootstrap";
import Destcompadmin from "../components/Destcompadmin";
import UserProfile from "../components/Userprofile";
    function AdminDashboard() {
     return (
        <Container>
            <Tab.Container defaultActiveKey="userprofile">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="userprofile">Admin Profile</Nav.Link>
                             
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="tourspot">Destnation Company Approvale(Tour Spot)</Nav.Link>
                            </Nav.Item>
                    
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="userprofile">
                      <UserProfile/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="tourspot">
                           <Destcompadmin/>
                            </Tab.Pane>
                         
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    );
}

export default AdminDashboard;