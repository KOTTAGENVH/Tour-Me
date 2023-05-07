//IT21013300
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from '@mui/icons-material/Cancel';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';

function Retrieveallbooktourspot() {
    const [loading, setLoading] = useState(false);  //usestate for loading,destination companies and search
    const [searchTerm, setSearchTerm] = useState("");
    const [destcomp, setDestComp] = useState([]);
    const user = useSelector((state) => state.user);

    const id = user._id;
    console.log(id);

    const sendRequest = async () => {
        const res = await axios.get(`http://localhost:8070/tourspotorder/fuser/${id}`)
        .catch((err) => console.log(err));
        const data = await res.data;
        console.log("order",data)
        setDestComp(data.user);
        setLoading(false);
      };

      const StyledTableCell = styled(TableCell)(({ theme }) => ({  //MUI tables styles
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));

      const handleCancel = async (orderId) => {
        try {
          const response = await axios.delete(`http://localhost:8070/tourspotorder/deleteTourSpot/${orderId}`);
          console.log(response.data.message);
          setDestComp((prevDestComp) =>
            prevDestComp.filter((destcomp) => destcomp._id !== orderId)
          );
        } catch (error) {
          console.error(error);
        }
      };

      const StyledTableRow = styled(TableRow)(({ theme }) => ({  //MUI tables styles
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
      var userid = user._id;
      console.log(userid);

      useEffect(() => {
        sendRequest();
        }, []);
        console.log("destcomp",destcomp);
        
        const orderSearch = destcomp.filter((user) => user.date.includes(searchTerm));
        console.log(orderSearch);
    
      if (loading) return <Loading />;
    
      if (destcomp.length === 0) {
        return <h2 className="py-2 text-center">No bookings yet</h2>;
      }
      
  return (
    <div className="client-page-container">
    <div className="filters-container d-flex justify-content-center pt-4 pb-4">
    <TextField id="outlined-basic" label="Search" variant="outlined" type="search"   onChange={(e) => setSearchTerm(e.target.value)} InputProps={{
endAdornment: (
<InputAdornment position="end">
  <SearchIcon />
</InputAdornment>
),
}}/>
</div>
    {orderSearch.length===0 ? (
        <h1>No bokings yet</h1>
    ):(
        <div>
           <TableContainer component={Paper}>
<Table sx={{ minWidth: 700 }} aria-label="customized table">
<TableHead>
  <TableRow>
               <StyledTableCell>Booking</StyledTableCell>
                <StyledTableCell>No. of Tickets</StyledTableCell>
                <StyledTableCell>Total</StyledTableCell>
                <StyledTableCell>Booked Date </StyledTableCell>
                <StyledTableCell>Booked On(DD/MM/YYYY)</StyledTableCell>
                <StyledTableCell></StyledTableCell>
            </TableRow>
            </TableHead>
           <TableBody>
           
            {orderSearch.map((destcomp) => (
               <StyledTableRow key={destcomp.productname}>
                 <StyledTableCell destcomp="th" scope="seller">
                 {destcomp.productname}
                 </StyledTableCell>
                    <StyledTableCell >{destcomp.Totaltickets}</StyledTableCell>
                    <StyledTableCell >{destcomp.total}</StyledTableCell>
                    <StyledTableCell >{destcomp.date}</StyledTableCell>
                    <StyledTableCell >{destcomp.datebook}</StyledTableCell>
                    <Button
      variant="outlined"
      color="error"
      startIcon={<CancelIcon />}
      onClick={() => handleCancel(destcomp._id)} // Pass the order ID to handleCancel
    >
     Cancel
    </Button>
                </StyledTableRow>
            ))}
             </TableBody>
         </Table>
             </TableContainer>
    </div>
   )}

   </div>

  )
}

export default Retrieveallbooktourspot
