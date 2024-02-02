// App.js
import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from Spring Boot backend when the component mounts
    fetch('http://localhost:8080/api/tasks')
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  const handleAddTask = (title) => {
    // Send a POST request to add a new task to the backend
    fetch('http://localhost:8080/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    })
      .then((response) => response.json())
      .then((newTask) => setTasks([...tasks, newTask]))
      .catch((error) => console.error('Error adding task:', error));
  };

  const handleTaskComplete = (taskId) => {
    // Send a PUT request to mark a task as completed
    fetch(`http://localhost:8080/api/tasks/${taskId}/complete`, {
      method: 'PUT',
    })
      .then(() => {
        const updatedTasks = tasks.map((task) =>
          task.id === taskId ? { ...task, completed: true } : task
        );
        setTasks(updatedTasks);
      })
      .catch((error) => console.error('Error completing task:', error));
  };

  const handleDeleteTask = (taskId) => {
    // Send a DELETE request to delete a task
    fetch(`http://localhost:8080/api/tasks/${taskId}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
      })
      .catch((error) => console.error('Error deleting task:', error));
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <TaskForm onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onTaskComplete={handleTaskComplete}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
};

export default App;
