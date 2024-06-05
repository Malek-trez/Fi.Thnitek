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
            Our carpool service facilitates cost-effective and environmentally friendly travel by connecting users with nearby drivers, 
            allowing them to share rides to common destinations, reducing traffic congestion and carbon emissions.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Share the Ride</small>
          </Card.Footer>
        </Card>

        <Card>
          <Card.Img variant="top" src={bus} className="card-img-fixed" />
          <Card.Body>
            <Card.Title>Bus</Card.Title>
            <Card.Text>
            With our bus ticket booking feature, users can conveniently browse bus routes, select preferred seats, and secure tickets seamlessly, 
            ensuring hassle-free travel and enabling access to a wide range of destinations.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Bus Travel Simplified</small>
          </Card.Footer>
        </Card>

        <Card>
          <Card.Img variant="top" src={train} className="card-img-fixed" />
          <Card.Body>
            <Card.Title>Train</Card.Title>
            <Card.Text>
            Our train ticket booking service offers users a convenient platform to search for train schedules, reserve seats, and purchase tickets effortlessly, 
            providing reliable and efficient transportation options for both short and long-distance travel.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Board and Go</small>
          </Card.Footer>
        </Card>
      </CardGroup>
    </>
  );
}

export default GroupExample;
