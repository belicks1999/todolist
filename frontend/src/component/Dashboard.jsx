// front-end/src/components/Dashboard.js

import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { FaStar, FaCalendarDay, FaCalendarWeek, FaList, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [taskInput, setTaskInput] = useState({ title: '', description: '' });
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const userId = JSON.parse(localStorage.getItem('user')).id;

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/tasks/${userId}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const fetchFilteredTasks = async (filter) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/tasks/filter/${userId}/${filter}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch filtered tasks:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTaskInput({ ...taskInput, [name]: value });
  };

  const handleAddTask = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/tasks/add', { ...taskInput, userId });
      setTasks([...tasks, response.data]);
      setTaskInput({ title: '', description: '' });
      setShowModal(false);
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  const handleRemoveTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/delete/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleMarkImportant = async (id) => {
    try {
      const response=await axios.put(`http://localhost:5000/api/tasks/important/${id}`);
      const updatedImportantStatus = response.data.important; 
      setTasks(tasks.map(task => task.id === id ? { ...task, important: updatedImportantStatus} : task));
    } catch (error) {
      console.error('Failed to mark task as important:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      <div className="w-1/4 bg-gradient-to-b from-teal-400 to-teal-600 p-6 shadow-lg flex flex-col justify-between">
        <div>
          <h2 className="text-5xl font-bold mb-10 text-white text-center">to<span className='bg-red-400 rounded-3xl'>do.</span></h2>
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-3 text-white text-center">Filters</h3>
            <ul className="space-y-3">
              <li className="flex text-xl text-center items-center cursor-pointer hover:bg-white hover:text-2xl" onClick={fetchTasks}>
                <FaList className="mr-2" /> All
              </li>
              <li className="flex text-xl text-center items-center cursor-pointer hover:bg-white hover:text-2xl" onClick={() => fetchFilteredTasks('important')}>
                <FaStar className="mr-2" /> Starred
              </li>
              <li className="flex text-xl text-center items-center cursor-pointer hover:bg-white hover:text-2xl" onClick={() => fetchFilteredTasks('today')}>
                <FaCalendarDay className="mr-2" /> Today
              </li>
              <li className="flex text-xl text-center items-center cursor-pointer hover:bg-white hover:text-2xl" onClick={() => fetchFilteredTasks('week')}>
                <FaCalendarWeek className="mr-2" /> Week
              </li>
            </ul>
          </div>
        </div>
        <button onClick={handleLogout} className='mt-auto bg-red-600 text-white py-2 px-4 rounded font-bold hover:bg-red-500 transition-colors hover:text-xl'>
          Logout
        </button>
      </div>
      <div className="w-3/4 bg-gray-50 p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Tasks</h2>
        <button
          onClick={() => setShowModal(true)}
          className="mb-4 bg-teal-600 text-white p-3 rounded font-semibold hover:bg-teal-700 transition-colors"
        >
          Add Task
        </button>
        
        <div className="flex-1 overflow-y-auto">
          <ul className="space-y-4">
            {tasks.map(task => (
              <li key={task.id} className="p-4 bg-white rounded shadow-lg flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <FaStar className={`mr-4 ${task.important ? 'text-yellow-500' : 'text-gray-500'}`} onClick={() => handleMarkImportant(task.id)} />
                  <div>
                    <h3 className="font-semibold text-gray-900">{task.title}</h3>
                    <p className="text-gray-700">{task.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveTask(task.id)}
                  className="ml-4 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Modal 
        show={showModal} 
        onClose={() => setShowModal(false)} 
        taskInput={taskInput} 
        handleInputChange={handleInputChange} 
        handleAddTask={handleAddTask} 
      />
    </div>
  );
};

export default Dashboard;
