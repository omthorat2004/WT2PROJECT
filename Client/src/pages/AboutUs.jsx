import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import './AboutUs.css'; // Optional: for custom styling

const AboutUs = () => {
  // Sample data for the number of results and tests
  const resultsCount = 1500; // Example number of results uploaded
  const testsCount = 50; // Example number of tests that can be performed

  // Sample technician data
  const technicians = [
    {
      name: "Dr. Aditi Sharma",
      specialization: "Pathologist",
      experience: "10 years",
      image: "https://via.placeholder.com/150" // Placeholder image
    },
    {
      name: "Mr. Rajesh Kumar",
      specialization: "Laboratory Technician",
      experience: "8 years",
      image: "https://via.placeholder.com/150" // Placeholder image
    },
    {
      name: "Ms. Priya Mehta",
      specialization: "Biochemist",
      experience: "5 years",
      image: "https://via.placeholder.com/150" // Placeholder image
    }
  ];

  return (
    <Container className="mt-5">
      <h2>About Us</h2>
      <p>
        Welcome to our pathology laboratory! We are committed to providing accurate and timely testing services to ensure the health and well-being of our patients. Our state-of-the-art facility and skilled technicians enable us to perform a wide range of tests.
      </p>
      <Row className="my-4">
        <Col md={6} className="text-center">
          <h4>Results Uploaded</h4>
          <h1>{resultsCount}</h1>
        </Col>
        <Col md={6} className="text-center">
          <h4>Tests Performed</h4>
          <h1>{testsCount}</h1>
        </Col>
      </Row>

      <h3>Meet Our Technicians</h3>
      <Row>
        {technicians.map((tech, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card>
              <Card.Img variant="top" src={tech.image} />
              <Card.Body>
                <Card.Title>{tech.name}</Card.Title>
                <Card.Text>
                  <strong>Specialization:</strong> {tech.specialization}<br />
                  <strong>Experience:</strong> {tech.experience}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h3>Our Commitment</h3>
      <p>
        Our laboratory is dedicated to maintaining the highest standards of quality and integrity. We continuously strive to improve our services and invest in advanced technologies to provide the best outcomes for our patients.
      </p>
    </Container>
  );
};

export default AboutUs;
