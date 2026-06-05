import { useState, useEffect } from 'react';

const PRIORITIES = [
  { value: 'low', label: 'Low', icon: '↓' },
  { value: 'medium', label: 'Medium', icon: '–' },
  { value: 'high', label: 'High', icon: '↑' },
];

const TaskForm = ({ onSubmit, initialData, onCancel }) => {
  const [form, setForm] = useState({ title: '', description: '', priority: 'medium' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title,
        description: initialData.description || '',
        priority: initialData.priority || 'medium',
      });
    }
  }, [initialData]);

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    else if (form.title.length > 100) errs.title = 'Title cannot exceed 100 characters';
    if (form.description.length > 500) errs.description = 'Description cannot exceed 500 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ title: form.title.trim(), description: form.description.trim(), priority: form.priority });
    if (!initialData) setForm({ title: '', description: '', priority: 'medium' });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>{initialData ? 'Edit Task' : 'Add New Task'}</h3>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={form.title}
          onChange={(e) => {
            setForm({ ...form, title: e.target.value });
            if (errors.title) setErrors({ ...errors, title: '' });
          }}
          className={errors.title ? 'input-error' : ''}
          placeholder="Task title"
        />
        {errors.title && <span className="error-text">{errors.title}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={form.description}
          onChange={(e) => {
            setForm({ ...form, description: e.target.value });
            if (errors.description) setErrors({ ...errors, description: '' });
          }}
          className={errors.description ? 'input-error' : ''}
          placeholder="Task description (optional)"
          rows="3"
        />
        {errors.description && <span className="error-text">{errors.description}</span>}
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Priority</label>
          <div className="priority-selector">
            {PRIORITIES.map((p) => (
              <button
                key={p.value}
                type="button"
                className={`priority-btn priority-${p.value}${form.priority === p.value ? ' active' : ''}`}
                onClick={() => setForm({ ...form, priority: p.value })}
              >
                {p.icon} {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {initialData ? 'Update Task' : 'Add Task'}
        </button>
        {onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
