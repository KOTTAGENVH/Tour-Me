//IT21013300
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, Grid, IconButton, Typography} from "@mui/material";
import { Button, Modal } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "../css/TourSpotAllUI.css";

const DestinationNowen = ({
  id,
  title,
  description,
  image,
  image1,
  price,
  NoTickets,
  Address,
  Address1,
  username,
}) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [Title, setTitle] = useState("");
  const [mainDescription, setmainDescription] = useState("");
  const [Description, setDescription] = useState("");
  const [Image, setImage] = useState("");
  const [Image1, setImage1] = useState("");
  const [Price, setPrice] = useState("");
  const [NoTicket, setNoTickets] = useState("");
  const [Addresses, setAddress] = useState("");
  const [Addresses1, setAddress1] = useState("");
  const user_id = useSelector((state) => state.user);
  const user_nA = useSelector((state) => state.user.name);
  console.log("username state",user_nA);
  console.log("username ",username);
  //Handle Edit function
  const handleEdit = () => {
    axios.put(`http://localhost:8070/tourspot/updateTourSpot/${id}`, {
      title: Title,
      maindescription: mainDescription,
      description: Description,
      image: Image,
      image1: Image1,
      price: Price,
      NoTickets: NoTicket,
      Address: Addresses,
      Address1: Addresses1,
      user: user_id,
    })
      .then((response) => {
        if (response) {
        window.location.reload(false);
      }
    });
  };
    const isAdmin = useSelector((state) => state.user.isAdmin);
    console.log("Check Admin", isAdmin);
    const isDest = useSelector((state) => state.user.isDest);

    //Sending the delete request to the backend
    const deleteRequest = async () => {
      const res = await axios
        .delete(`http://localhost:8070/tourspot/deleteTourSpot/${id}`)
        .catch((err) => console.log(err));
      const data = await res.data;
        return data;
      };
  
    //After deleting navigate back to All feedbacks page
      const handleDelete = () => {
      deleteRequest()
        .then(() => navigate("/"))
        .then(() => navigate("/dest"));
        window.location.reload(false);
      };
      const [isHovered, setIsHovered] = useState(false);

      const handleCardHover = () => {
        setIsHovered(!isHovered);
      };
  return (
    <div className="tourspot">
        <Card
          sx={{
            maxWidth: "100%",
            minHeight: "30%",
            maxHeight: "100%",
            minWidth: "75%",
            marginTop: 1,
            marginBottom: 2,
            marginLeft: 5,
            marginRight: 5,
            textAlign: "center",
            backgroundColor: "lightgray",
            borderRadius: 12,
            transition: 'transform 0.3s',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            cursor: 'pointer'
          }}
          onMouseEnter={handleCardHover}
          onMouseLeave={handleCardHover}
        >
          <CardHeader
            avatar={
            <Avatar 
            sx={{ bgcolor: "red" }}
            aria-label="user"
            >
              {username}
              </Avatar>
              }
              title={<Typography component="h1" variant="h4" align="center">
              {title}
            </Typography>}
          />
   <hr />
           <Box display="flex">
           <CardMedia
          component="img"
          height="250"
          sx={{ width: 400 }} 
          image={image}
          alt=""
        />
          <CardContent sx={{ padding: '0 s' }}>
         
            <br />
            
            <Typography variant="body2" className="card-description">
       


            <table>
            <tr>
           <td class="table-row-data"><b>Description:</b> {description}</td>
        
         
        </tr>
          
        <tr>
        <td class="table-row-data"><b>Location 🗺️ :</b> {Address} {Address1}</td>
        </tr>
        <tr>
            <td class="table-row-data"><button><a href={'/viewtourspot/'+id}>View</a></button></td>
        
            {isAdmin || (isDest && user_nA === username) ? (
  <div>
    <button className="btn btn-danger" onClick={() => handleDelete()}>
      Delete
    </button>
    
    &nbsp;&nbsp;
    
    <button className="btn btn-primary" onClick={handleShow}>
      Edit
    </button>
  </div>
) : (
  <div>
    {/* Alternative JSX element when conditions are not met */}
    <p>You do not have permission to perform this action.</p>
  </div>
)}


        </tr>
      </table>


            </Typography>
           
            
          </CardContent>
          </Box>
         
        </Card>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update TourSpot details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
          /*Modal for update Update TourSpot details*/
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="form-control"
          />
           <br></br>
          <input
            placeholder="Main Description"
            onChange={(e) => {
              setmainDescription(e.target.value);
            }}
            className="form-control"
          />
          <br></br>
          <input
            placeholder="Summary Description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="form-control"
          />
            <br></br>
               <input
            placeholder="Image Url 1"
            onChange={(e) => {
              setImage(e.target.value);
            }}
            className="form-control"
          />
            <br></br>
           <input
            placeholder="Image Url 2"
            onChange={(e) => {
              setImage1(e.target.value);
            }}
            className="form-control"
          />
            <br></br>
           <input
            placeholder="Price"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            className="form-control"
          />
            <br></br>
           <input
            placeholder="No. of Tickets"
            onChange={(e) => {
              setNoTickets(e.target.value);
            }}
            className="form-control"
          />
            <br></br>
           <input
            placeholder="Address1"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            className="form-control"
          />
            <br></br>
           <input
            placeholder="Address2"
            onChange={(e) => {
              setAddress1(e.target.value);
            }}
            className="form-control"
          />
          <br></br>
      
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
  );
};

export default DestinationNowen;
