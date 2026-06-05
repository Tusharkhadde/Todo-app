import { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, initialData, onCancel }) => {
  const [form, setForm] = useState({ title: '', description: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({ title: initialData.title, description: initialData.description || '' });
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
    onSubmit({ title: form.title.trim(), description: form.description.trim() });
    if (!initialData) setForm({ title: '', description: '' });
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
