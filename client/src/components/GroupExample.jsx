import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import car from './images/car.jfif';
import bus from './images/bus.png';
import train from './images/tarin.jpg';

function GroupExample() {
  return (
    <>
      <style jsx>{`
        .card-img-fixed {
          height: 300px; /* Set the desired height */
          object-fit: cover; /* Ensure the image covers the area */
          width: 100%; /* Ensure the width is 100% of the card */
        }
      `}</style>

      <CardGroup className="my-5 mx-4">
        <Card>
          <Card.Img variant="top" src={car} className="card-img-fixed" />
          <Card.Body>
            <Card.Title>Carpool </Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural lead-in
              to additional content. This content is a little bit longer.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>

        <Card>
          <Card.Img variant="top" src={bus} className="card-img-fixed" />
          <Card.Body>
            <Card.Title>Bus</Card.Title>
            <Card.Text>
              This card has supporting text below as a natural lead-in to
              additional content.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>

        <Card>
          <Card.Img variant="top" src={train} className="card-img-fixed" />
          <Card.Body>
            <Card.Title>Train</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural lead-in
              to additional content. This card has even longer content than the
              first to show that equal height action.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
      </CardGroup>
    </>
  );
}

export default GroupExample;
