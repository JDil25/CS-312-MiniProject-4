// PostList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditPost from './EditPost'; // Import EditPost component

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null); // Track which post is being edited

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/posts'); // Fetch posts from the API
                setPosts(response.data); // Update state with fetched posts
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts(); // Call the fetch function on component mount
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/delete/${id}`); // Call delete API
            setPosts(posts.filter(post => post.id !== id)); // Update state to remove deleted post
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleEdit = (post) => {
        setEditingPost(post); // Set the post to be edited
    };

    const handleUpdate = (updatedPost) => {
        setPosts(posts.map(post => (post.id === updatedPost.id ? updatedPost : post))); // Update the post in the list
        setEditingPost(null); // Clear the editing post state
    };

    return (
        <div>
            <h1>Blog Posts</h1>
            {editingPost ? (
                <EditPost post={editingPost} onUpdate={handleUpdate} /> // Show edit form if editing
            ) : (
                posts.map(post => (
                    <div key={post.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <p><strong>Author:</strong> {post.name}</p>
                        <p><strong>Date:</strong> {post.date}</p>
                        <button onClick={() => handleEdit(post)}>Edit</button>
                        <button onClick={() => handleDelete(post.id)}>Delete</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default PostList;