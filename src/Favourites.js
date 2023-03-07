import React, { useEffect, useState } from 'react';

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const storedFavourites = JSON.parse(localStorage.getItem('favourites'));
    if (storedFavourites) {
      setFavourites(storedFavourites);
    }
  }, []);

  return (
    <div>
      <h1>Favourites</h1>
      {favourites.map((postId) => (
        <div key={postId}>
          <h2>Post {postId}</h2>
          <p>This is the content of post {postId}.</p>
        </div>
      ))}
    </div>
  );
};

export default Favourites;