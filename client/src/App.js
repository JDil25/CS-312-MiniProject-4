import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [posts, setPosts] = useState([]); // State for blog posts
    const [newPost, setNewPost] = useState({ title: '', content: '', name: '' }); // State for the new post form
    const [editingPostId, setEditingPostId] = useState(null); // State to track the post being edited
    const [editPost, setEditPost] = useState({ title: '', content: '', name: '' }); // State for the edit post form
    const [user, setUser] = useState(null); // State for logged-in user
    const [signinData, setSigninData] = useState({ username: '', password: '' });
    const [signupData, setSignupData] = useState({ username: '', password: '' });

    useEffect(() => {
        if (user) {
            // Fetch posts from the backend API on component mount, only if logged in
            fetch('/api/posts')
                .then((response) => response.json())
                .then((data) => setPosts(data))
                .catch((error) => console.error('Error fetching posts:', error));
        }
    }, [user]);

    const handleSigninSubmit = (e) => {
        e.preventDefault();
        
        fetch('/api/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signinData),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.message === 'Signed in successfully') {
                setUser({ username: signinData.username });
            } else {
                alert('Invalid credentials');
            }
        })
        .catch((error) => console.error('Error signing in:', error));
    };

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        
        fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signupData),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.message === 'User created successfully') {
                alert('Account created! You can now sign in.');
            } else {
                alert('Error creating account');
            }
        })
        .catch((error) => console.error('Error signing up:', error));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        
        // Create a new post via the backend API
        fetch('/api/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newPost.name, title: newPost.title, content: newPost.content }),
        })
        .then((response) => response.json())
        .then((data) => {
            setPosts([...posts, data]); // Update the posts state with the new post
            setNewPost({ title: '', content: '', name: '' }); // Reset the form
        })
        .catch((error) => console.error('Error creating post:', error));
    };

    const handleEdit = (post) => {
        setEditingPostId(post.id); // Set the current post ID to be edited
        setEditPost({ title: post.title, content: post.content, name: post.name }); // Pre-fill the edit form
    };

    const handleUpdate = (e) => {
        e.preventDefault(); // Prevent default form submission
        
        // Update the post via the backend API
        fetch(`/api/edit/${editingPostId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: editPost.name, title: editPost.title, content: editPost.content }),
        })
        .then((response) => response.json())
        .then((data) => {
            setPosts(posts.map(post => (post.id === editingPostId ? data : post))); // Update the posts state with the edited post
            setEditingPostId(null); // Reset editing state
            setEditPost({ title: '', content: '', name: '' }); // Reset edit form
        })
        .catch((error) => console.error('Error updating post:', error));
    };

    const handleDelete = (id) => {
        fetch(`/api/delete/${id}`, {
            method: 'DELETE',
        })
        .then((response) => response.json())
        .then(() => {
            setPosts(posts.filter(post => post.id !== id)); // Remove the deleted post from the state
        })
        .catch((error) => console.error('Error deleting post:', error));
    };

    const handleSignout = () => {
        setUser(null); // Set user to null to log out
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>The Blogspot</h1>

                {!user ? (
                    // Sign In Form
                    <div>
                        <h2>Sign In</h2>
                        <form onSubmit={handleSigninSubmit}>
                            <input
                                type="text"
                                placeholder="Username"
                                value={signinData.username}
                                onChange={(e) => setSigninData({ ...signinData, username: e.target.value })}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={signinData.password}
                                onChange={(e) => setSigninData({ ...signinData, password: e.target.value })}
                                required
                            />
                            <button type="submit">Sign In</button>
                        </form>
                        <p>Don't have an account? <button onClick={() => setSignupData({ username: '', password: '' })}>Create Account</button></p>
                    </div>
                ) : (
                    // Show posts and post creation form
                    <div>
                        <p>Welcome, {user.username} <button onClick={handleSignout}>Sign Out</button></p>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Username"
                                value={newPost.name}
                                onChange={(e) => setNewPost({ ...newPost, name: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Title"
                                value={newPost.title}
                                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                required
                            />
                            <textarea
                                placeholder="Post Content"
                                value={newPost.content}
                                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                required
                            />
                            <button type="submit">Post it!</button>
                        </form>

                        {/* Edit post form */}
                        {editingPostId && (
                            <form onSubmit={handleUpdate}>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    value={editPost.name}
                                    onChange={(e) => setEditPost({ ...editPost, name: e.target.value })}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={editPost.title}
                                    onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
                                    required
                                />
                                <textarea
                                    placeholder="Content"
                                    value={editPost.content}
                                    onChange={(e) => setEditPost({ ...editPost, content: e.target.value })}
                                    required
                                />
                                <button type="submit">Update Post</button>
                                <button type="button" onClick={() => setEditingPostId(null)}>Cancel</button>
                            </form>
                        )}

                        <h2>Latest posts:</h2>
                        {posts.length > 0 ? (
                            <ul>
                                {posts.map((post) => (
                                    <li key={post.id}>
                                        <h3>{post.name}</h3>
                                        <h2>{post.title}</h2>
                                        <p>{post.content}</p>
                                        <p><em>Posted by {post.name} on {formatDate(post.date)}</em></p>
                                        <button onClick={() => handleEdit(post)}>Edit</button>
                                        <button onClick={() => handleDelete(post.id)}>Delete</button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>There are no posts. It's lonely here...</p>
                        )}
                    </div>
                )}
            </header>
        </div>
    );
}

export default App;