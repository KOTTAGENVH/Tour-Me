//IT21013300
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import Loading from "../components/Loading";
import "../css/Profile.css";
import Box from "@mui/material/Box";
import EmailIcon from '@mui/icons-material/Email';
import { Avatar } from "@mui/material";
import { Button, Modal } from "react-bootstrap";
//Customer profile function
function Profile () {
    const navigate = useNavigate();
   const users = useSelector((state) => state.user);

   console.log("userid",users._id);
   const [user, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [Name, setName] = useState("");
    const [Tel, setTel] = useState("");
    const [address, setAddress] = useState("");
    const [Image, setImage] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

//Handle Edit function
const handleEdit = () => {
    axios.put(`http://localhost:8070/users/updateusers/${users._id}`, {
        name: Name,
        Tel: Tel,
        address: address,
        image: Image,
        email: Email,
        password: Password,
    })
      .then((response) => {
        if (response) {
        window.location.reload(false);
      }
    });
  };

   //Sending the delete request to the backend
   const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:8070/users/deleteusers/${users._id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
      return data;
    };

  //After deleting navigate back to All tourspots page
  const handleDelete = () => {
    deleteRequest()
      .then(() => navigate("/"))
      .then(() => navigate("/Signup"));
      window.location.reload(false);
  }
    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:8070/users/${users._id}`)
            .then(({ data }) => {
                setLoading(false);
                setUsers(data);
            })
            .catch((e) => {
                setLoading(false);
                console.log(e);
            });
    }, []);

    if (loading) {
        return <Loading />;
    }

    
     
    return (
        <div>
        <Container className="Profile">
               <hr></hr>
               <Box display="flex" justifyContent="center">
               <Avatar
  className="avatar"
  alt={users.name}
  src={users.image}
  sx={{ width: 100, height: 100 }} 
/>
    </Box>

                   <h2> Welcome {users.name} !!!! </h2>
               <hr></hr>
               <br></br>
                 <Table  striped bordered >
               <tr>
                <td>
                 <h3><EmailIcon/> Email : </h3>
                </td>
                <td>{users.email}</td>
               </tr>
                 <br/>
                 <br/>
               <tr>
                <td>
                 <h3>📞 Tel : </h3>
                </td>
                <td>{users.Tel}</td>
               </tr>
               <br/>
               <br/>
               <tr>
                <td>
                 <h3>🏠 Address : </h3>
                </td>
                <td>{users.address}</td>
               </tr>             
            </Table>
            <button className="btn btn-danger" onClick={() => handleDelete()}>
      Delete
    </button>
    
    &nbsp;&nbsp;
    
    <button className="btn btn-primary" onClick={handleShow}>
      Edit
    </button>
        </Container>
             <Modal show={show} onHide={handleClose}>
             <Modal.Header closeButton>
               <Modal.Title>Update Your details</Modal.Title>
             </Modal.Header>
             <Modal.Body>
               <input
               /*Modal for update Update TourSpot details*/
                 placeholder="Name"
                 onChange={(e) => {
                   setName(e.target.value);
                 }}
                 className="form-control"
               />
                <br></br>
               <input
                 placeholder="Tel"
                 onChange={(e) => {
                   setTel(e.target.value);
                 }}
                 className="form-control"
               />
               <br></br>
               <input
                 placeholder="Address"
                 onChange={(e) => {
                   setAddress(e.target.value);
                 }}
                 className="form-control"
               />
                 <br></br>
                    <input
                 placeholder="Image Url "
                 onChange={(e) => {
                   setImage(e.target.value);
                 }}
                 className="form-control"
               />
                 <br></br>
                <input
                 placeholder="Email Address"
                 onChange={(e) => {
                   setEmail(e.target.value);
                 }}
                 className="form-control"
               />
                 <br></br>
                <input
                 placeholder="Password"
                 onChange={(e) => {
                   setPassword(e.target.value);
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
}

export default Profile;