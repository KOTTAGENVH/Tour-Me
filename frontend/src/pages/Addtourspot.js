import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import '../CSS/Addtourspot.css'

//IT21013300

const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };
//Add feedback function
const Addtourspot = () => {
    const User = useSelector((state) => state.user);
    const isApproved = useSelector((state) => state.user.isApproved);
    console.log("user", User._id)
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        title: "",
        maindescription: "",
        description: "",
        image: "",
        image1: "",
        price: "",
        NoTickets: "",
        Address: "",
        Address1: "",
        });
    
        const handleChange = (e) => {
            setInputs((prevState)=> ({
                ...prevState,
                [e.target.name]: e.target.value,
            }));
        };

        const sendRequest = async () => {
            const res = await axios.post("http://localhost:8070/tourspot/addtourspot", {
                title: inputs.title,
                maindescription: inputs.maindescription,
                description: inputs.description,
                image: inputs.image,
                image1: inputs.image1,
                price: inputs.price,
                NoTickets: inputs.NoTickets,
                Address: inputs.Address,
                Address1: inputs.Address1,
                user: User._id,
            }).catch((err) => console.log(err));
                const data = await res.data;
                return data;
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            sendRequest().then((data) => {
                if (data.error) {
                    alert(data.error);
                } else {
                    alert("Tour Spot Added Successfully");
                    navigate("/dest");
                }
            });
        };
        var ApprovalSatt = "Sorry Your Account is not Approved Yet🗺️🤨"
if(isApproved.toString()==="true"){
    return (
        <div className="Addtourspot">
              <form onSubmit={handleSubmit}>
            <Box
          border={3}
          borderColor="linear-gradient(90deg, rgba(255,252,13,1) 60%, rgba(110,224,200,1) 100%, rgba(169,175,14,1) 100%)"
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin={"auto"}
          marginTop={3}
          display="flex"
          flexDirection={"column"}
          width={"80%"}
            >
                <Typography 
                fontWeight={"bold"}
                padding={3}
                color="black"
                variant="h2"
                textAlign={"center"}>

                    ✈️Add Tour Spot🌍
                    </Typography>
                    <InputLabel sx={labelStyles}>Title</InputLabel>
                    <TextField
                        id="outlined-basic"
                        label="Title"
                        variant="outlined"
                        name="title"
                        value={inputs.title}
                        onChange={handleChange}
                    />
                 <InputLabel sx={labelStyles}>Main Description </InputLabel>
                    <TextField
                        id="filled-textarea"
                        label="Description"
                        name="maindescription"
                        placeholder="Placeholder"
                        value={inputs.maindescription}
                        onChange={handleChange}
                        multiline
                        variant="filled"
                    />
                 <InputLabel sx={labelStyles}>Summary Description </InputLabel>
                    <TextField
                        id="outlined-basic" 
                        label="Description"
                        variant="outlined"
                        name="description"
                        value={inputs.description}
                        onChange={handleChange}
                    />
                 <InputLabel sx={labelStyles}>Image1 🖼️</InputLabel>
                    <TextField
                        id="outlined-basic"
                        label="Image"
                        variant="outlined"
                        name="image"
                        value={inputs.image}
                        onChange={handleChange}
                    />
                <InputLabel sx={labelStyles}>Image2 🖼️</InputLabel>
                    <TextField
                        id="outlined-basic"
                        label="Image1"
                        variant="outlined"
                        name="image1"
                        value={inputs.image1}
                        onChange={handleChange}
                    />
                 <InputLabel sx={labelStyles}>Price💲</InputLabel>
                    <TextField
                        id="outlined-basic"
                        label="Price"
                        variant="outlined"
                        name="price"
                        value={inputs.price}
                        onChange={handleChange}
                    />
                 <InputLabel sx={labelStyles}>No. of Tickets 🎟️</InputLabel>
                    <TextField
                        id="filled-number"
                        label="NoTickets"
                        variant="outlined"
                        type="number"
                        name="NoTickets"
                        value={inputs.NoTickets}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                          }}
                         />
                <InputLabel sx={labelStyles}>Address1 🗺️</InputLabel>
                    <TextField
                        id="outlined-basic"
                        label="Address"
                        variant="outlined"
                        name="Address"
                        value={inputs.Address}
                        onChange={handleChange}
                    />
                  <InputLabel sx={labelStyles}>Address2 🗺️</InputLabel>
                    <TextField
                        id="outlined-basic"
                        label="Address1"
                        variant="outlined"
                        name="Address1"
                        value={inputs.Address1}
                        onChange={handleChange}
                    />
               <Button
            sx={{ mt: 2, borderRadius: 4 }}
            variant="contained"
            color="warning"
            type="submit" 
          >
            {" "}
            Submit 😉
          </Button>
            </Box>
            </form>
        </div>
    );
                        }else{
                            return ApprovalSatt;
                        }
};


export default Addtourspot;

