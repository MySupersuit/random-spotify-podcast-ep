import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { FaSpotify } from 'react-icons/fa';
import '../App.css';

const RandomPodcast = ({ show }) => {
  const [randomPodcast, setRandomPodcast] = useState();
  const accessToken = Cookies.get('spotifyAccessToken');
  const [isLoading, setIsLoading] = useState(true);

  // hack? to update when the props update
  useEffect(() => {
    setIsLoading(true);
  }, [show]);

  // get a random podcast
  useEffect(() => {
    if (!isLoading) return;
    let randPodcast = randomNumber(show.total_episodes);

    const options = {
      method: 'GET',
      url: `https://api.spotify.com/v1/shows/${show.id}/episodes?offset=${randPodcast}&limit=1`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    axios(options).then(res => {
      setRandomPodcast(res.data.items[0]);
      setIsLoading(false);
    });
  }, [isLoading]);

  const randomNumber = max => {
    return Math.floor(Math.random() * max);
  };

  return randomPodcast ? (
    <div>
      <h1 className='text-center mt-2'>Random Episode</h1>
      <Card>
        <Row className='justify-content-md-center align-items-center'>
          <Col>
            <Card.Body>
              <Card.Title>{randomPodcast.name}</Card.Title>
              <Card.Text>
                {randomPodcast.description.length > 350
                  ? `
            ${randomPodcast.description.substring(0, 350)}...`
                  : `${randomPodcast.description}`}
              </Card.Text>
            </Card.Body>
          </Col>
          <Col xs={12} sm={6} md={3} className='m-2'>
            <Row className='mb-3 justify-content-center' xs={2} sm={2} md={2}>
              <Button
                className='btn btn-md mt-2'
                style={{
                  backgroundColor: '#1DB954',
                  color: '#191414',
                  borderColor: '#1DB954',
                }}
                href={randomPodcast.external_urls.spotify}
                target='_blank'
                rel='noreferrer'
              >
                Open in <s />
                <FaSpotify size='1.3em' />
              </Button>
            </Row>
            <Row>
              <Card.Img
                className='mb-2'
                variant='top'
                src={randomPodcast.images[0].url}
              />
            </Row>
          </Col>
        </Row>
      </Card>
      <div className='flex-grow-1 my-2 text-center'>
        <Button
          variant='secondary'
          disabled={isLoading}
          onClick={() => setIsLoading(true)}
        >
          {isLoading ? 'Loading...' : 'Get Another'}
        </Button>
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
};

export default RandomPodcast;
