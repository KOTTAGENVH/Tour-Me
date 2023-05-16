import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
function HotelCard() {
  return (
<div>
<Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography sx={{ fontSize: 65 }} color="text.secondary" gutterBottom>
             Hotel Booking "Book Hotels🛎️"
            </Typography>
            <Typography variant="h5" component="div"></Typography>
            <Typography variant="body2">
            Want a place to stay Book Now!!!
              <br />
      
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" href="/hotel">BOOK HOTEL</Button>
          </CardActions>
          <br></br><br></br>
        </Card>

    </div>
  )
}

export default HotelCard
