import { useState } from 'react';
import TaskForm from './TaskForm';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [animating, setAnimating] = useState(false);

  const handleToggle = () => {
    setAnimating(true);
    onUpdate(task._id, {
      status: task.status === 'completed' ? 'pending' : 'completed',
    });
    setTimeout(() => setAnimating(false), 300);
  };

  const handleEdit = (data) => {
    onUpdate(task._id, data);
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="task-item editing">
        <TaskForm
          initialData={task}
          onSubmit={handleEdit}
          onCancel={() => setEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className={`task-item ${task.status} ${animating ? 'animating' : ''}`}>
      <div className="task-content">
        <div className="task-header">
          <h4 className={`task-title ${task.status === 'completed' ? 'completed' : ''}`}>
            {task.title}
          </h4>
          <span className={`task-status status-${task.status}`}>
            {task.status === 'completed' ? 'Done' : 'Active'}
          </span>
        </div>
        {task.description && <p className="task-description">{task.description}</p>}
        <span className="task-date">
          {new Date(task.createdAt).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric',
          })}
        </span>
      </div>
      <div className="task-actions">
        <button
          onClick={handleToggle}
          className="btn-icon complete"
          title={task.status === 'completed' ? 'Mark pending' : 'Mark complete'}
        >
          {task.status === 'completed' ? '↩' : '✓'}
        </button>
        <button
          onClick={() => setEditing(true)}
          className="btn-icon edit"
          title="Edit task"
        >
          ✎
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="btn-icon delete"
          title="Delete task"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
