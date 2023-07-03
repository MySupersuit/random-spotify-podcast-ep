import React, { useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-node';
import useAuth from '../useAuth';
import PodcastInfo from './PodcastInfo';
import RandomPodcast from './RandomPodcast';
import ShowSearchResult from './ShowSearchResult';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_SPOTIFY_CLIENT,
});

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [chosenShow, setChosenShow] = useState();

  const chooseShow = show => {
    setSearch('');
    setChosenShow(show);
  };

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.searchShows(search).then(res => {
      if (cancel) return;
      const results = res.body.shows.items.map(show => {
        const smallestImage = show.images.reduce((smallest, image) => {
          if (image.height < smallest.height) return image;
          return smallest;
        }, show.images[0]);

        const largestImage = show.images.reduce((largest, image) => {
          if (image.height > largest.height) return image;
          return largest;
        }, show.images[0]);

        return {
          description: show.description,
          external_url: show.external_urls.spotify,
          href: show.href,
          id: show.id,
          imageSmall: smallestImage.url,
          imageLarge: largestImage.url,
          name: show.name,
          total_episodes: show.total_episodes,
        };
      });
      setSearchResults(results);
    });
    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <Container className='d-flex flex-column py-2' style={{ height: '100%' }}>
      <Form.Control
        size='lg'
        style={{fontSize: '3.0vh'}}
        type='search'
        placeholder='Search Shows'
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div
        className='flex-grow-2 my-2'
        style={{ overflowY: 'auto', overflowX: 'hidden' }}
      >
        {searchResults.map(show => (
          <ShowSearchResult show={show} key={show.id} chooseShow={chooseShow} />
        ))}
        {chosenShow ? (
          <div>
            <PodcastInfo show={chosenShow} />
            <RandomPodcast show={chosenShow} />
          </div>
        ) : (
          ''
        )}
      </div>
    </Container>
  );
};

export default Dashboard;
