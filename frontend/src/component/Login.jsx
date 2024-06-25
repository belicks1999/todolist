import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

function Login() {
  return (
    <div className="bg-gray-800 h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-center text-2xl font-bold mb-8 text-gray-700">LOGIN</h1>
        
        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
        <input className="w-full p-3 border border-gray-300 rounded mt-1 mb-4 focus:outline-none focus:border-blue-500" 
               type="email" placeholder="Enter Your Email" name="email" />
        
        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
        <input className="w-full p-3 border border-gray-300 rounded mt-1 mb-6 focus:outline-none focus:border-blue-500" 
               type="password" placeholder="Enter Your Password" name="password" />
        
        <button className="w-full bg-blue-600 hover:bg-blue-700 rounded text-lg text-white py-3 transition duration-300 mb-6">LOGIN</button>

        <div className="relative mb-6">
          <hr className="border-gray-300" />
          <span className="absolute inset-x-0 top-2/4 transform -translate-y-2/4 bg-white px-2 text-gray-500 text-center">OR</span>
        </div>
        
        <button className="w-full bg-red-500 hover:bg-red-600 rounded text-white py-3 flex items-center justify-center transition duration-300">
          <FontAwesomeIcon icon={faGoogle} className="mr-2 text-lg" />Login with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
