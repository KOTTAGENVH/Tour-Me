//IT21013300
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
        <tbody>
          <tr>
            <td>
              <CarouselHome />
            </td>
          </tr>
          <tr>
          <td style={{ paddingBottom: '20px' }}>
              <DestinationCard />
            </td>
          </tr>
          <tr>
            <td style={{ paddingBottom: '20px' }}>
              <HotelCard />
            </td>
          </tr>
          <tr>
            <td style={{ paddingBottom: '20px' }}>
              <SouvenierCard />
            </td>
          </tr>
          <tr>
            <td>
              <TravelCard />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Home;
