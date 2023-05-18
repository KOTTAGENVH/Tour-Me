//IT21013300
import React, { useEffect, useState } from 'react'
import { Badge, Button, ButtonGroup, Col, Container, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import Loading from '../components/Loading';
import { LinkContainer } from 'react-router-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import '../css/OneTourSpotView.css';

function OneTourSpotView(props) {

    const { id } = useParams(props);

    const [tourspot, setTourSpot] = useState({});
    const user = useSelector((state) => state.user);
    const [rating, setRating] = useState('');
  
    const fetchDetails = async () => {
      const res = await axios
        .get(`http://localhost:8070/tourspot/getTourSpot/${id}`)
        .catch((err) => console.log(err));
      const data = await res.data;
      console.log('tour2', data);
      return data;
    };
  
    useEffect(() => {
      fetchDetails().then((data) => setTourSpot(data.tourspot));
    }, []);
  
    const updateRating = async (newRating) => {
      try {
        await axios.patch(`http://localhost:8070/tourspot/updaterating/${id}`, { rating: newRating });
        fetchDetails().then((data) => setTourSpot(data.tourspot));
      } catch (error) {
        console.log(error);
      }
    };
  
  console.log(tourspot.rating);
    if (!tourspot) {
      return <Loading />;
    }
  return (
    <Container className="pt-4" style={{ position: "relative" }}>
    <Row>
        <Col lg={6}>
        <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={tourspot.image}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>{tourspot.title}</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={tourspot.image1}
          alt="Second slide"
        />

        <Carousel.Caption>
        <h3>{tourspot.title}</h3>
        </Carousel.Caption>
      </Carousel.Item>
      </Carousel>
        </Col>
        <Col lg={6}>
            <h3>{tourspot.title}</h3>
            <p>About Us : {tourspot.maindescription}</p>
            <p>Ticket 🎫 Price Rs. {tourspot.price}</p>
            <p>Location 🗺️ : {tourspot.Address}<br/>{tourspot.Address1}</p>
            <p>No. of Tickets Available : {tourspot.NoTickets}</p>
            <h3>Ratings</h3>
            <Rating
            name="tourspot-rating"
            value={Number(tourspot.rating)} // Convert rating to number
            onChange={(event, newRating) => updateRating(newRating)}
          />
            <h3>Contact US on</h3>
            <p>Phone  📞 : {tourspot.usertel}</p>
            <p>Email  📧 : {tourspot.useremail}</p>
            <p>Posted by 🤵 : {tourspot.username}</p>
            <br />
            <br />
            <LinkContainer to={'/tourspotcart/'+id}>
                <Button variant="dark">Book Now</Button>
            </LinkContainer>
        </Col>
    </Row>
    <Row>
      <Col>
      <LinkContainer to={'/dest'}>
                <Button variant="dark">Go BACK</Button>
            </LinkContainer>
      </Col>
    </Row>
</Container>

            
  )
}

export default OneTourSpotView

