import React, { useState } from 'react';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [referralId, setReferralId] = useState(localStorage.getItem('referrer') || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate creating a user (you can integrate an API to save the user data)
    const user = {
      id: Math.random().toString(36).substr(2, 9), // Random user ID
      name,
      email,
      referredBy: referralId,
    };

    // Simulate saving user data in localStorage (or backend)
    localStorage.setItem('user', JSON.stringify(user));

    alert('User created successfully!');
    // Optionally redirect user to another page
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
