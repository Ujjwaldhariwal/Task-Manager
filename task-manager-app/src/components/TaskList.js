// TaskList.js
import React from 'react';

const TaskList = ({ tasks, onTaskComplete, onDeleteTask }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.id}</td>
            <td>{task.title}</td>
            <td>{task.completed ? 'Completed' : 'Pending'}</td>
            <td>
              <button onClick={() => onTaskComplete(task.id)}>Complete</button>
              <button onClick={() => onDeleteTask(task.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskList;
