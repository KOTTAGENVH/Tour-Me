//IT21013300
import React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function DestinationCard() {
  const [isHovered, setIsHovered] = useState(false);

  const handleCardHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <div>
      <Card
        sx={{
          minWidth: 200,
          transition: 'transform 0.3s',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          cursor: 'pointer',
          borderRadius: 12,
        }}
        onMouseEnter={handleCardHover}
        onMouseLeave={handleCardHover}
      >
        <CardContent>
          <Typography sx={{ fontSize: 65 }} color="text.secondary" gutterBottom>
            Tour Spot "Visit Destinations🐫🗺️"
          </Typography>
          <Typography variant="h5" component="div"></Typography>
          <Typography variant="body2">
            Have an idea in traveling and want to visit? Book now!
            <br />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" href="/dest">
            BOOK DESTINATION
          </Button>
        </CardActions>
        <br />
        <br />
      </Card>
    </div>
  );
}

export default DestinationCard;
