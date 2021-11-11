import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const PodcastInfo = ({ show }) => {
  return (
    <Card>
      <Row className='justify-content-md-center align-items-center'>
        <Col xs={12} sm={6} md={3} className='m-2'>
          <Card.Img variant='top' src={show.imageLarge} />
        </Col>
        <Col>
          <Card.Body>
            <Card.Title>{show.name}</Card.Title>
            <Card.Text>
              {show.description.length > 350
                ? `
            ${show.description.substring(0, 350)}...`
                : `${show.description}`}
            </Card.Text>
            <Card.Text className='muted-text'>
              Episodes: {show.total_episodes}
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default PodcastInfo;
