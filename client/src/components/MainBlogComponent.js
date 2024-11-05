import React, { useEffect, useState } from 'react';

function MainBlogComponent() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Fetch posts from the backend API
        fetch('/api/posts')
            .then((response) => response.json())
            .then((data) => setPosts(data))
            .catch((error) => console.error('Error fetching posts:', error));
    }, []);

    return (
        <div className="main-blog">
            <h2>Latest Posts</h2>
            {posts.length > 0 ? (
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <h3>{post.name}</h3>
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                            <p><em>On {post.date}</em></p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No posts available.</p>
            )}
        </div>
    );
}

export default MainBlogComponent;