import React, { useState } from 'react';
import Modal from './Modal';
import { FaStar, FaCalendarDay, FaCalendarWeek, FaList, FaTrash } from 'react-icons/fa';

const Dashboard = () => {
  const [taskInput, setTaskInput] = useState({
    title: "",
    description: ""
  });

  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTaskInput({
      ...taskInput,
      [name]: value
    });
  };

  const handleAddTask = (event) => {
    event.preventDefault();
    if (taskInput.title && taskInput.description) {
      setTasks([...tasks, taskInput]);
      setTaskInput({ title: "", description: "" });
      setShowModal(false);
    }
  };

  const handleRemoveTask = (index) => {
    const newTasks = tasks.filter((task, taskIndex) => taskIndex !== index);
    setTasks(newTasks);
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      <div className="w-1/4 bg-gradient-to-b from-teal-400 to-teal-600 p-6 shadow-lg flex flex-col justify-between">
        <div>
          <h2 className="text-5xl font-bold mb-10 text-white text-center">to<span className='bg-red-400 rounded-3xl'>do.</span></h2>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3 text-white">Filters</h3>
            <ul className="space-y-3">
              <li className="flex items-center cursor-pointer hover:text-teal-100">
                <FaList className="mr-2" /> All
              </li>
              <li className="flex items-center cursor-pointer hover:text-teal-100">
                <FaStar className="mr-2" /> Starred
              </li>
              <li className="flex items-center cursor-pointer hover:text-teal-100">
                <FaCalendarDay className="mr-2" /> Today
              </li>
              <li className="flex items-center cursor-pointer hover:text-teal-100">
                <FaCalendarWeek className="mr-2" /> Week
              </li>
            </ul>
          </div>
        </div>
        <button className='mt-auto bg-red-600 text-white py-2 px-4 rounded font-bold hover:bg-red-500 transition-colors'>
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
            {tasks.map((task, index) => (
              <li key={index} className="p-4 bg-white rounded shadow-lg flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <FaStar className="mr-4 text-gray-500" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{task.title}</h3>
                    <p className="text-gray-700">{task.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveTask(index)}
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
