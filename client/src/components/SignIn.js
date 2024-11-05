import React, { useState } from 'react';

const SignIn = ({ onSignIn }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSignIn(credentials);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign In</h2>
            <input
                type="text"
                placeholder="Username"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
            />
            <button type="submit">Sign In</button>
            <p>
                Don't have an account? <a href="/signup">Create Account</a>
            </p>
        </form>
    );
};

export default SignIn;