import { useState } from 'react';
import TaskForm from './TaskForm';

const PRIORITY_META = {
  low: { icon: '↓', label: 'Low' },
  medium: { icon: '–', label: 'Medium' },
  high: { icon: '↑', label: 'High' },
};

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [toggling, setToggling] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const completed = task.status === 'completed';
  const priority = PRIORITY_META[task.priority] || PRIORITY_META.medium;

  const handleToggle = () => {
    setToggling(true);
    onUpdate(task._id, {
      status: completed ? 'pending' : 'completed',
    });
    setTimeout(() => setToggling(false), 500);
  };

  const handleDelete = () => {
    setDeleting(true);
    setTimeout(() => onDelete(task._id), 400);
  };

  const handleEdit = (data) => {
    onUpdate(task._id, data);
    setEditing(false);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
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
    <div className={`task-item ${task.status} ${toggling ? 'toggling' : ''} ${deleting ? 'deleting' : ''}`}>
      <button className="task-check" onClick={handleToggle} title={completed ? 'Mark pending' : 'Mark complete'}>
        <span className={`check-circle ${completed ? 'checked' : ''}`}>
          {completed && <svg viewBox="0 0 24 24" className="check-icon"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>}
        </span>
      </button>

      <div className="task-content">
        <div className="task-header">
          <h4 className={`task-title ${completed ? 'completed' : ''}`}>
            {task.title}
          </h4>
          <div className="task-badges">
            <span className={`badge badge-priority priority-${task.priority}`}>
              {priority.icon} {priority.label}
            </span>
            <span className={`badge badge-status status-${task.status}`}>
              {completed ? '✓ Done' : '○ Pending'}
            </span>
          </div>
        </div>
        {task.description && <p className={`task-description ${completed ? 'completed' : ''}`}>{task.description}</p>}
        <div className="task-meta">
          <span className="task-date">
            <svg className="meta-icon" viewBox="0 0 24 24"><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/></svg>
            {formatDate(task.createdAt)}
          </span>
          {completed && task.completedAt && (
            <span className="task-completed-date">
              <svg className="meta-icon" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
              Done {formatDate(task.completedAt)}
            </span>
          )}
        </div>
      </div>
      <div className="task-actions">
        <button
          onClick={() => setEditing(true)}
          className="btn-icon edit"
          title="Edit task"
        >
          <svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
        </button>
        <button
          onClick={handleDelete}
          className="btn-icon delete"
          title="Delete task"
        >
          <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
