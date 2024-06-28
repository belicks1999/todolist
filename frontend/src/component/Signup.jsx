// front-end/src/components/Signup.js

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';



function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });
      if (response.data) {
        // Redirect to login page after successful signup
        navigate('/');
      }
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  const handleGoogleSignup = () => {
    window.open('http://localhost:5000/api/auth/google', '_self');
  };

  return (
    <div className="bg-teal-600 h-screen flex justify-center items-center">
      <div className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">SIGNUP</h1>

        <form onSubmit={handleSignup}>
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Enter Your Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Enter Your Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Enter Your Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-lg font-semibold py-3 mb-4 transition duration-200"
          >
            Signup
          </button>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative text-center">
            <span className="bg-white px-2 text-gray-500">OR</span>
          </div>
        </div>

        <button
          onClick={handleGoogleSignup}
          className="w-full bg-red-500 hover:bg-red-600 rounded-lg text-white text-sm font-semibold py-3 flex items-center justify-center transition duration-200"
        >
          <FontAwesomeIcon icon={faGoogle} className="mr-2 text-lg" />Signup with Google
        </button>

        <div className="mt-6 text-center">
          <p className="text-gray-600">Already have an account? <Link to="/" className="text-blue-600 hover:underline">Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
