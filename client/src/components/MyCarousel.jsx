import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import image1 from './images/image1.jpg'; // Import your images
import image2 from './images/image2.jpg';
import image3 from './images/image3.jpg';

const MyCarousel = () => {
  return (
    <Carousel className="mx-4 my-4">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image1} // Use the imported image as the source
          alt="First slide"
          style={{ height: '600px' }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image2}
          alt="Second slide"
          style={{ height: '600px' }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image3}
          alt="Third slide"
          style={{ height: '600px' }}
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default MyCarousel;
