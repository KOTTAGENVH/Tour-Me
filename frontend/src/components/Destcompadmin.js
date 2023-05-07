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
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from '@mui/icons-material/Done';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';

const Destcompadmin = () => {
    const [loading, setLoading] = useState(false);  //usestate for loading,destination companies and search
  const [searchTerm, setSearchTerm] = useState("");
  const [destcomp, setDestComp] = useState([]);
  const user = useSelector((state) => state.user);

  const sendRequest = async () => {
    const res = await axios.get("http://localhost:8070/users/").catch((err) => console.log(err));
    const data = await res.data;
    const destUsers = data.filter((users) => users.isDest === true); // Filter users with isDest set to true
    setDestComp(destUsers);
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

        //Reject of destcomp
const handleReject = async (destcomp) => {
    try {
      const response = await axios.put(`http://localhost:8070/users/reject/${destcomp._id}`, {
        isApproved: false
      });
       // Update the destination  state with the updated destcomp object
       setDestComp(prevdests => prevdests.map(s => s._id === destcomp._id ? {...s, isApproved: false} : s));
    } catch (error) {
      console.error(error);
    }
  };

     //Approval of destcomp
     const handleApprove = async (destcomp) => {
        try {
          const response = await axios.put(`http://localhost:8070/users/approve/${destcomp._id}`, {
            isApproved: true
          });
          // Update the destcomp state with the updated destcomp object
          setDestComp(prevdests => prevdests.map(s => s._id === destcomp._id ? {...s, isApproved: true} : s));
        } catch (error) {
          console.error(error);
        }
      };
      

       //React hooks and send request function to set destcomp
  useEffect(() => {
    sendRequest();
    }, []);
    console.log("destcomp",destcomp);
    
    const destcompSearch = destcomp.filter((users) => users.name.toLowerCase().includes(searchTerm.toLowerCase()));
    console.log(destcompSearch)

    if (loading) return <Loading />;

     if (destcomp?.length == 0){
          return <h2 className="py-2 text-center">No destcomp yet</h2>; //If no destcomp
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
    {destcompSearch.length===0 ? (
        <h1>No destcomp yet</h1>
    ):(
        <div>
           <TableContainer component={Paper}>
<Table sx={{ minWidth: 700 }} aria-label="customized table">
<TableHead>
  <TableRow>
               <StyledTableCell>SellerID</StyledTableCell>
                <StyledTableCell>ShopName</StyledTableCell>
                <StyledTableCell>name</StyledTableCell>
                <StyledTableCell>Address</StyledTableCell>
                <StyledTableCell>email</StyledTableCell>
                <StyledTableCell>Approval Status Status</StyledTableCell>
                <StyledTableCell>Approve🌿 OR Reject⛔</StyledTableCell>
            </TableRow>
            </TableHead>
           <TableBody>
           
            {destcompSearch.map((destcomp) => (
               <StyledTableRow key={destcomp._id}>
                 <StyledTableCell destcomp="th" scope="seller">
                 {destcomp._id}
                 </StyledTableCell>
                    <StyledTableCell >{destcomp.name}</StyledTableCell>
                    <StyledTableCell >{destcomp.Tel}</StyledTableCell>
                    <StyledTableCell >{destcomp.address}</StyledTableCell>
                    <StyledTableCell >{destcomp.email}</StyledTableCell>
                    <StyledTableCell>{destcomp.isApproved.toString()}</StyledTableCell>

                    <Button variant="contained" onClick={() => handleApprove(destcomp)} color="success" startIcon={<DoneIcon />} >Approve</Button>
                    <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => handleReject(destcomp)}>Reject</Button>
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


export default Destcompadmin