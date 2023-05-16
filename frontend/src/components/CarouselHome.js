import React from 'react'
import { Carousel } from 'react-bootstrap'
function CarouselHome() {
  return (
    <div>
        <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://awayandfar.com/wp-content/uploads/2019/01/Nuwara-Eliya.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Travel Mate</h3>
            <p>Travellers Choice🌍</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://c8.alamy.com/comp/M38JYM/souvenirs-on-berber-market-in-marrakesh-morocco-africa-M38JYM.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Travel Mate</h3>
            <p>Travellers Choice🌍</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/80043638.jpg?k=e71cfeccccd35d54ba5272323e199a217e11133c087a6895112571490da6acdd&o=&hp=1"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Travel Mate</h3>
            <p>Travellers Choice🌍</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

export default CarouselHome
