/*

import React, { useState } from 'react';
import axios from 'axios';

function RedditPosts() {
  const [subreddit, setSubreddit] = useState('');
  const [posts, setPosts] = useState([]);
  const [favourites, setFavourites] = useState([]);

  const fetchPosts = async () => {
    const clientId = 'Y3reioc3iBnPhuBR5ayCpQ'; // Replace with your own client ID
    const clientSecret = 'ih5ExqZplMfUzWFqBVmWsYLD6w832g'; // Replace with your own client secret
    const basicAuth = btoa(`${clientId}:${clientSecret}`);
    const response = await axios.post(
      'https://www.reddit.com/api/v1/access_token',
      'grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${basicAuth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    const accessToken = response.data.access_token;

    const response2 = await axios.get(
      `https://oauth.reddit.com/r/${subreddit}/hot?limit=10`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'User-Agent': 'MyRedditApp/0.0.1',
        },
      }
    );
    setPosts(response2.data.data.children.map((post) => post.data));
  };

  const handleFavourite = (postId) => {
    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    if (!favourites.includes(postId)) {
      favourites.push(postId);
      localStorage.setItem('favourites', JSON.stringify(favourites));
      setFavourites(favourites);
    }
  };

  const handleShowFavourites = () => {
  const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
  const favouritePosts = [];
  favourites.forEach(async (postId) => {
    const response = await axios.get(
      `https://www.reddit.com/api/info.json?id=${postId}`
    );
    favouritePosts.push(response.data.data.children[0].data);
  });
  setPosts(favouritePosts);
};

  const handleClear = () => {
    setPosts([]);
    setFavourites([]);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter subreddit name"
        value={subreddit}
        onChange={(e) => setSubreddit(e.target.value)}
      />
      <button onClick={fetchPosts}>Get Posts</button>
      <button onClick={handleShowFavourites}>Show Favourites</button>
      <button onClick={handleClear}>Clear</button>
      {favourites.length > 0 ? (
        favourites.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.selftext}</p>
          </div>
        ))
      ) : (
        posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.selftext}</p>
            <button onClick={() => handleFavourite(post.id)}>Favourite Button</button>
          </div>
        ))
      )}
    </div>
  );
}

export default RedditPosts;
*/
