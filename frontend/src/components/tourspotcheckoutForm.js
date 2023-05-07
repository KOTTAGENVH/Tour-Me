import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {Button } from "@mui/material";
import { useSelector } from 'react-redux';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import TourSpotCheckoutForm  from "./TourSpotstripecardelement";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";



//IT21013300
export default function AddressForm() {
    const { id } = useParams();
    console.log(id);
    const [tourspot, setTourSpot] = useState({});
    const [totals, setTotal] = useState({});
   
    const user = useSelector((state) => state.user);
    console.log("asd",user._id);
    const navigate = useNavigate();

    const fetchDetails = async () => {
        const res = await axios
          .get(`http://localhost:8070/tourspot/getTourSpot/${id}`)
          .catch((err) => console.log(err));
        const data = await res.data;
        console.log("tour2",data);
        return data;
        
      };

      useEffect(() => {
        fetchDetails().then((data) => setTourSpot(data.tourspot));
      }, []);
     console.log("T", tourspot);
    
    const stripePromise = loadStripe("pk_test_51LhBwPD1ftP7zi2EyNFkPwVpF1aNqWAcSPfC1uOax7uhBS0PTBsarzTDeHWW05tboEdPmVfhjFiMblPy3zThFb3D00HMPZn8jh");

    const calTotal = (tickets) => {
    const total = tickets* tourspot.price;
    setTotal(total);
  };

    const [inputs, setInputs] = useState({
      Totaltickets: "",
      datebook: "",
      });
  
      const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevInputs) => ({
          ...prevInputs,
          [name]: value,
        }));
        
        // Calculate total when Totaltickets changes
        if (name === "Totaltickets") {
          const tickets = parseInt(value);
          if (!isNaN(tickets)) {
            calTotal(tickets);
          }
        }
      };
      
      async function handlePay() {
        await axios.post('http://localhost:8070/tourspotpayment/addpayment', {amount: totals})
        navigate("/dest");
    }
  
      const sendRequest = async () => {
        try {
          const res = await axios.post("http://localhost:8070/tourspotorder/addtourspotorders", {
            user: user._id,
            product: id,
            productname: tourspot.title,
            Totaltickets: inputs.Totaltickets,
            total: totals,
            datebook: inputs.datebook,
          });
          const data = res.data;
          console.log("data", data);
          return data;
        } catch (err) {
          console.log(err);
          throw err;
        }
      };
      
      const updateNoTickets = async () => {
        try {
          const response = await axios.patch(`http://localhost:8070/tourspot/updateticketcount/${id}`, {
            NoTickets: parseInt(tourspot.NoTickets) - parseInt(inputs.Totaltickets),
          });
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        sendRequest()
          .then(() => {
            updateNoTickets(); // Update NoTickets value
            alert("Booking Successful");
            navigate("/dest");
          })
          .catch((error) => {
            console.log(error);
            alert("Booking Failed");
          });
      };
    return (

    
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
       Confirm Your Booking
      </Typography>
      <Grid container spacing={3}>
      <Grid item xs={12}>
          <TextField
             disabled
            id="title"
            name="title"
            label={`Destination: ${tourspot.title}`}
            fullWidth
            autoComplete="family-name"
            variant="filled"
          />
          </Grid>
      <Grid item xs={12}>
          <TextField
             disabled
            id="price"
            name="price"
            label={`Price per ticket: ${tourspot.price}`}
            fullWidth
            autoComplete="family-name"
            variant="filled"
          />
        
        </Grid>
      
          <Grid item xs={12}>
          <TextField
             disabled
            id="NoTickets"
            name="NoTickets"
            label={`Avialable Tickets: ${tourspot.NoTickets}`}
            fullWidth
            autoComplete="family-name"
            variant="filled"
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
             disabled
            id="name"
            name="name"
            label={`Your name: ${user.name}`}
            fullWidth
            autoComplete="family-name"
            variant="filled"
          />
        
        </Grid>
        <Grid item xs={12}>
          <TextField
            disabled
            id="address"
            name="address"
            label={`Your address: ${user.address}`}
            fullWidth
            autoComplete="shipping address-line1"
            variant="filled"
          />
        </Grid>
       
        <Grid item xs={12}>
        <TextField
            disabled
            id="Total"
            name="Total"
            label={`Total: ${totals}`} // Convert 'totals' to string
            fullWidth
            autoComplete="shipping address-line1"
            variant="filled"
          />
        </Grid>
        
        </Grid>
        <br/>
        <form onSubmit={handleSubmit}>
        <Grid item xs={12} >
           <TextField
               id="filled-number"
                label="Enter the number of tickets needed"
                fullWidth
                variant="filled"
                type="number"
                name="Totaltickets"
                value={inputs.Totaltickets}
                onChange={handleChange}
                InputLabelProps={{
                shrink: true,
                    }}
                 />
            
<br></br><br></br>

<TextField 
id="filled-basic"
name="datebook"
label={`Enter your booking date DD/MM/YYYY`}
value={inputs.datebook}
fullWidth
onChange={handleChange}
variant="filled"/>

   
        
        </Grid>
        <Button
            sx={{ mt: 2, borderRadius: 4 }}
            variant="contained"
            color="warning"
            type="submit" 
          >
            {" "}
            Confirm 
          </Button>
        </form>
        <br/>
        <form onSubmit={handlePay}>
        <Grid item xs={12}>
        <Elements stripe={stripePromise}>
              <TourSpotCheckoutForm />
         </Elements>
        </Grid>
        <Button
            sx={{ mt: 2, borderRadius: 4 }}
            variant="contained"
            color="warning"
            type="submit" 
          >
            {" "}
            Pay 
          </Button>
        </form>
       
      
    </React.Fragment>
  );
}