import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import {Link} from "react-router-dom";


function Singup(){

    return (
        <div className="bg-gradient-to-r from-gray-600 to-gray-800 h-screen flex justify-center items-center">
          <div className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full">
            <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">SIGNUP</h1>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Name</label>
            <input className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Enter Your Name" name="name" />
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
            <input className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Enter Your Email" name="email" />
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
            <input className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500" type="password" placeholder="Enter Your Password" name="password" />
            <button className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-lg font-semibold py-3 mb-4 transition duration-200">Signup</button>
    
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative text-center">
                <span className="bg-white px-2 text-gray-500">OR</span>
              </div>
            </div>
    
            <button className="w-full bg-red-500 hover:bg-red-600 rounded-lg text-white text-sm font-semibold py-3 flex items-center justify-center transition duration-200">
              <FontAwesomeIcon icon={faGoogle} className="mr-2 text-lg" />Signup with Google
            </button>
    
            <div className="mt-6 text-center">
              <p className="text-gray-600">Already have an account? <Link to="/" className="text-blue-600 hover:underline">Login</Link></p>
            </div>
          </div>
        </div>
      );


}


export default Singup;