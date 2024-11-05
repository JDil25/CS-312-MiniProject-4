import React, { useState } from 'react';

const SignUp = () => {
    const [signupData, setSignupData] = useState({ username: '', password: '' });

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        console.log('Signup Data:', signupData);
    };

    return (
        <form onSubmit={handleSignupSubmit}>
            <h2>Create Account</h2>
            <input
                type="text"
                placeholder="Username"
                value={signupData.username}
                onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={signupData.password}
                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                required
            />
            <button type="submit">Create Account</button>
        </form>
    );
};

export default SignUp;