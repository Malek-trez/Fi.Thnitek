import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import image from './images/C.jpg';


function CardExample() {
  return (
    <div className="my-5 mx-4 " >
      <style>
        {`
          .see-more-btn {
            background: linear-gradient(45deg, #00FFFF, #0000FF);
          }
        `}
      </style>
      <Row>
        <Col md={8} className="d-flex align-items-center">
          <Card style={{ width: '100%' }}>
            <Card.Body>
              <Card.Title>What encourages people to carpool? </Card.Title>
              <Card.Text>
                Carpooling brings benefits to carpool participants and the environment and society. Literature has called for a better understanding of psychological factors encouraging people to carpool however current research does not provide an in-depth psychological understanding of carpooling behaviour. This paper provides a review....
              </Card.Text>
              <Button variant="primary" className="see-more-btn" href='https://www.sciencedirect.com/science/article/pii/S2590198221001986'>See more</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="d-flex align-items-center justify-content-center">
          <Image src={image} style={{ width: '90%' }} />
        </Col>
      </Row>
    </div>
  );
}

export default CardExample;
