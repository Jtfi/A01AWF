 /*
 * Filename:    App.js
 * By:          Justin Fink
 * Date:		March 06, 2023
 * Description: This website can get specific subreddit posts, you can then add/unadd posts to your favourite 
 *              you can then display all favourite posts from all subredits and that is about all. I use the RedditAPI and the WebStorageAPI to 
 *              get reddit posts and to store the postid for use in the favourites part
 */


import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    //Variables
    const [posts, setPosts] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [subreddit, setSubreddit] = useState('');
    var fetchPoatsButtonActive = 1;
  
    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`https://www.reddit.com/r/${subreddit}/hot.json?limit=10`);
            fetchPoatsButtonActive = 1;
            setPosts(response.data.data.children);
        } catch (error) {
        console.error(error);
        }
        
        
    };


    const handleFavorite = (postId) => {
        const storedFavorites = localStorage.getItem('favorites');
        let favoriteIds = [];

        if (storedFavorites) {
        favoriteIds = JSON.parse(storedFavorites);
        }

        const postIndex = favoriteIds.indexOf(postId);

        if (postIndex !== -1) {
            // Post is already a favorite, remove it
            favoriteIds = favoriteIds.filter((id) => id !== postId);
        } else {
            // Add post to favorites
            favoriteIds.push(postId);
        }

        localStorage.setItem('favorites', JSON.stringify(favoriteIds));

        // Update the state to reflect the change
        const updatedPosts = posts.map((post) => {
        if (post.data.id === postId) {
            return { ...post, isFavorite: !post.isFavorite };
        }
            return post;
        });
        
        setPosts(updatedPosts);
    };

    const handleRefresh = async () => {
        
        if(fetchPoatsButtonActive === 1)
        {
            
            try {
            const response = await axios.get(`https://www.reddit.com/r/${subreddit}/hot.json?limit=10`);
            setPosts(response.data.data.children);
            } catch (error) {
                console.error(error);
            }
            
        }
        else{
            
            const storedFavorites = localStorage.getItem('favorites');
            if (storedFavorites) {
                const favoriteIds = JSON.parse(storedFavorites);
                console.log('favoriteIds:', favoriteIds);

                const favoritePosts = [];
                for (let i = 0; i < favoriteIds.length; i++) {
                    try {
                        const response = await axios.get(`https://www.reddit.com/comments/${favoriteIds[i]}/.json`);
                        console.log('response:', response.data);
    
                        // check if response data has children array and is not empty
                        if (response.data && response.data.length > 0 && response.data[0].data.children.length > 0) {
                            favoritePosts.push(response.data[0].data.children[0]);
                        }
                    } catch (error) {
                    console.error(error);
                    }
                }

                fetchPoatsButtonActive = 0
                setPosts(favoritePosts);
            }
            
        }
    };

    const handleShowFavorites = async () => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            const favoriteIds = JSON.parse(storedFavorites);
            console.log('favoriteIds:', favoriteIds);

            const favoritePosts = [];
            for (let i = 0; i < favoriteIds.length; i++) {
                try {
                    const response = await axios.get(`https://www.reddit.com/comments/${favoriteIds[i]}/.json`);
                    console.log('response:', response.data);
    
                    // check if response data has children array and is not empty
                    if (response.data && response.data.length > 0 && response.data[0].data.children.length > 0) {
                        favoritePosts.push(response.data[0].data.children[0]);
                    }
                } catch (error) {
                    console.error(error);
                }
            }

            fetchPoatsButtonActive = 0
            setPosts(favoritePosts);
        }
    };

    const renderPost = (post) => {
        const postId = post.data.id;
    
        return (
            <div key={postId}>
                <h3>{post.data.title}</h3>
                <p>Score: {post.data.score}</p>
                <p>{post.data.selftext}</p>
                <p>by {post.data.author}</p>
                <button onClick={() => handleFavorite(postId)}>Favorite or Unfavourite</button>
                <p>
                    {post.data.permalink && (
                    <a href={`https://www.reddit.com${post.data.permalink}`} target="_blank" rel="noopener noreferrer">
                    Comment Section
                    </a>
                )}
                </p>
                <p>____________________________________________________________________________________________________________________________________________________________________________________________________________________________________</p>
            </div>
        );
    };

    const renderFavorites = () => {
        return (
        <>
            {favorites.map((postId) => {
            return (
                <div key={postId}>
                    <p>Favorited post: {postId}</p>
                </div>
            );
            })}
        </>
        );
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
        <h2>Top 10 posts from r/{subreddit}</h2>
        <button onClick={() => handleRefresh()}>Refresh</button>
        <button onClick={() => handleShowFavorites()}>Show favorites</button>
        {favorites.length > 0 && <p>{favorites.length} posts favorited</p>}
        {posts.map((post) => renderPost(post))}
        {favorites.length > 0 && (
            <>
            <h2>Favorites</h2>
            {renderFavorites()}
            </>
        )}
    </div>
  );
}

export default App;
