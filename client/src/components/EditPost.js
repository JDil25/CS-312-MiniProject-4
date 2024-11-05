import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditPost = () => {
    const { id } = useParams();  // Retrieve the post ID from the route parameters
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [name, setName] = useState('');

    // Fetch the existing post data when the component loads
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/posts/${id}`);
                const post = response.data;
                setTitle(post.title);
                setContent(post.content);
                setName(post.name);
            } catch (error) {
                console.error('Error fetching post data:', error);
            }
        };
        fetchPost();
    }, [id]);

    // Handle form submission for updating the post
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`/edit/${id}`, { title, content, name });
            // Redirect or provide success feedback as needed
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    return (
        <div>
            <h1>Edit Post</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <label htmlFor="content">Blog Content:</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <label htmlFor="name">Enter Username:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <button type="submit">Update Post</button>
            </form>
        </div>
    );
};

export default EditPost;