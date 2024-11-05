import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/create', { title, content, name }); // Corrected endpoint
            console.log('Post created:', response.data); // Log the created post
            // Clear the form
            setTitle('');
            setContent('');
            setName('');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div>
            <h1>Create a New Blog Post</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Blog Title:</label>
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
                <label htmlFor="name">Username:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <button type="submit">Post it!</button>
            </form>
        </div>
    );
};

export default CreatePost;