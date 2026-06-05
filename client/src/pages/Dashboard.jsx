import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import api from '../utils/api';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import ConfirmModal from '../components/ConfirmModal';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [allTasks, setAllTasks] = useState({ total: 0, completed: 0, pending: 0 });

  const limit = 6;

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit };
      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter;
      if (priorityFilter) params.priority = priorityFilter;

      const { data } = await api.get('/tasks', { params });
      setTasks(data.tasks);
      setTotalPages(data.pages);
      setTotal(data.total);

      const { data: statsData } = await api.get('/tasks', { params: { limit: 999 } });
      const completedCount = statsData.tasks.filter(t => t.status === 'completed').length;
      const pendingCount = statsData.tasks.filter(t => t.status === 'pending').length;
      setAllTasks({ total: statsData.total, completed: completedCount, pending: pendingCount });
    } catch {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter, priorityFilter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter, priorityFilter]);

  const handleCreate = async (data) => {
    try {
      await api.post('/tasks', data);
      toast.success('Task created!');
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create task');
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await api.put(`/tasks/${id}`, data);
      toast.success('Task updated!');
      fetchTasks();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update task');
    }
  };

  const handleDelete = async (id) => {
    setDeleteTarget(null);
    try {
      await api.delete(`/tasks/${id}`);
      toast.success('Task deleted!');
      fetchTasks();
    } catch {
      toast.error('Failed to delete task');
    }
  };

  const completionRate = allTasks.total > 0 ? Math.round((allTasks.completed / allTasks.total) * 100) : 0;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h2>My Tasks</h2>
          {total > 0 && <span className="task-subtitle">{total} task{total !== 1 ? 's' : ''}</span>}
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          <svg className="btn-icon-svg" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
          {showForm ? 'Cancel' : 'New Task'}
        </button>
      </div>

      {allTasks.total > 0 && (
        <div className="stats-bar">
          <div className="stat">
            <span className="stat-value">{allTasks.total}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat">
            <span className="stat-value stat-pending">{allTasks.pending}</span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat">
            <span className="stat-value stat-completed">{allTasks.completed}</span>
            <span className="stat-label">Done</span>
          </div>
          <div className="stat progress-stat">
            <div className="progress-ring">
              <svg viewBox="0 0 36 36">
                <path className="progress-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="progress-fill" strokeDasharray={`${completionRate}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <span className="progress-text">{completionRate}%</span>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <TaskForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
      )}

      <div className="filters">
        <div className="search-box">
          <svg className="search-icon" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="clear-search" onClick={() => setSearch('')}>✕</button>
          )}
        </div>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="">All Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {loading ? (
        <div className="loading-screen">
          <div className="spinner" />
        </div>
      ) : (
        <>
          <TaskList tasks={tasks} onUpdate={handleUpdate} onDelete={handleDelete} />

          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="btn btn-sm"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                ← Prev
              </button>
              <span className="page-info">
                Page {page} of {totalPages} ({total} tasks)
              </span>
              <button
                className="btn btn-sm"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}

      {deleteTarget && (
        <ConfirmModal
          message="Are you sure you want to delete this task?"
          onConfirm={() => handleDelete(deleteTarget)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
