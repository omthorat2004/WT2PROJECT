import React from 'react';
import { Carousel, Col, Container, Row } from 'react-bootstrap';
import './Home.css'; // Optional: for custom styling

const Home = () => {
  return (
    <div>
      {/* Image Slider */}
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://media.istockphoto.com/id/1156457427/photo/smart-nice-woman-looking-at-the-test-tube.jpg?s=612x612&w=0&k=20&c=OSFQ9kfvt_01IT7tri2ghc24kqEtBIoFoLvswagtNAM=" // Replace with your image path
            alt="First slide"
          />
          <Carousel.Caption className="bg-dark bg-opacity-50 text-white">
            <h3>Welcome to Our Pathology Laboratory</h3>
            <p>Your health is our priority.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://media.istockphoto.com/id/1371707479/photo/two-scientist-conducting-an-experiment-in-laboratory.jpg?s=612x612&w=0&k=20&c=FTIBlIL2wNJF9RZFg4-LdLcq7DnMYvXGwwugEFX-DOM=" 
            alt="Second slide"
          />
          <Carousel.Caption className="bg-dark bg-opacity-50 text-white">
            <h3>Quality Testing Services</h3>
            <p>We ensure accurate and timely results.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://media.istockphoto.com/id/1485442572/photo/research-scientist-and-man-with-test-tube-breakthrough-and-focus-on-experiment-analysis-and.jpg?s=612x612&w=0&k=20&c=YrRCBFychl6eWqC5bmQAyvagQWMCKVV_eF32_uTE4I0=" 
            alt="Third slide"
          />
          <Carousel.Caption className="bg-dark bg-opacity-50 text-white">
            <h3>Advanced Technology</h3>
            <p>Utilizing the latest technology for diagnosis.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Container className="mt-5">
        <Row>
          <Col>
            <h2>Our Mission</h2>
            <p>
              At our pathology laboratory, our mission is to provide high-quality, timely, and accurate testing services to ensure the health and well-being of our patients. We strive to uphold the highest standards of quality and integrity in our work.
            </p>
          </Col>
        </Row>
      </Container>

     
      <Container className="mt-5">
        <Row>
          <Col>
            <h2>Location</h2>
            <div className="map-container">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.2798985701!2d-74.25987468451181!3d40.69767006351059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a25c3777d0f%3A0x24c882b9b0f8c601!2sNew%20York%20City%2C%20NY%2010001%2C%20USA!5e0!3m2!1sen!2sin!4v1607576802131!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
