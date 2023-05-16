import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
function TravelCard() {
  return (
    <div>
    <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography sx={{ fontSize: 65 }} color="text.secondary" gutterBottom>
             Travel Booking "Book A Journey 🚌🚇"
            </Typography>
            <Typography variant="h5" component="div"></Typography>
            <Typography variant="body2">
            Want to travel Book Now!!!
              <br />
      
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" href="/travel">BOOK TRAVEL</Button>
          </CardActions>
          <br></br><br></br>
        </Card>

  </div>
  )
}

export default TravelCard
