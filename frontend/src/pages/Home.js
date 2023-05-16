import React from 'react';
import { Carousel, Row } from 'react-bootstrap';
import DestinationCard from '../components/DestinationCard';
import CarouselHome from '../components/CarouselHome';
import HotelCard from '../components/HotelCard';
import SouvenierCard from '../components/SouvenierCard';
import TravelCard from '../components/TravelCard';

function Home() {
  return (
    <div className="filters-container d-flex justify-content-center pt-4 pb-4">
<table width="95%" height="80%">
<row>
<CarouselHome/>
</row>
<row>
<DestinationCard/>
</row>
<row>
<HotelCard/>
</row>
<row>
<SouvenierCard/>
</row>
<row>
<TravelCard/>
</row>
</table>

 
   
    </div>
    );
}
export default Home;
