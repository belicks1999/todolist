// src/components/Modal.js
import React from 'react';

const Modal = ({ show, onClose, taskInput, handleInputChange, handleAddTask }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Add Task</h2>
        <form onSubmit={handleAddTask}>
          <input
            onChange={handleInputChange}
            name="title"
            type="text"
            value={taskInput.title}
            placeholder="Task Title"
            className="p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-800"
          />
          <textarea
            onChange={handleInputChange}
            name="description"
            value={taskInput.description}
            placeholder="Task Description"
            className="p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-800"
          ></textarea>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 bg-gray-600 text-white p-2 rounded hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-teal-600 text-white p-2 rounded hover:bg-teal-700 transition-colors"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
