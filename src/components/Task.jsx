import React, { useState, useEffect } from 'react';
import './Task.css';
import Sidebar from './Sidebar';
import Header from "./Header.jsx";
import { taskService } from '../services/taskService';

const Task = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // State for tasks list
    const [tasks, setTasks] = useState([]);

    // State for form
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        assignedTo: ''
    });

    // 🔹 Load tasks on page load
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const data = await taskService.getAllTasks();
            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    // 🔹 Handle form input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    // 🔹 Submit form (Create Task)
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await taskService.createTask(formData);
            fetchTasks(); // refresh list

            // reset form
            setFormData({
                title: '',
                description: '',
                dueDate: '',
                assignedTo: ''
            });

        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    // 🔹 Delete task
    const handleDelete = async (id) => {
        try {
            await taskService.deleteTask(id);
            fetchTasks();
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    // 🔹 Mark as completed
    const handleComplete = async (id) => {
        try {
            await taskService.updateTaskStatus(id, "completed");
            fetchTasks();
        } catch (error) {
            console.error("Update failed:", error);
        }
    };

    return (
        <div className="dashboard-layout">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="dashboard-main">
                <Header
                    title="Tasks"
                    subtitle="Manage and organize your tasks"
                    onToggleSidebar={() => setIsSidebarOpen(true)}
                />

                <div className="dashboard-content">
                    <div className="row">
                        <div className="col-md-8 mx-auto">

                            {/* ✅ Add Task Form */}
                            <div className="card shadow-sm task-form-section">
                                <div className="card-body">
                                    <h2 className="card-title mb-4">Add New Task</h2>

                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label">Title</label>
                                            <input
                                                type="text"
                                                id="title"
                                                className="form-control"
                                                value={formData.title}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Description</label>
                                            <textarea
                                                id="description"
                                                className="form-control"
                                                rows="3"
                                                value={formData.description}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Due Date</label>
                                            <input
                                                type="datetime-local"
                                                id="dueDate"
                                                className="form-control"
                                                value={formData.dueDate}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="d-grid">
                                            <button type="submit" className="btn btn-primary">
                                                Add Task
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* ✅ Task List */}
                            <div className="card shadow-sm tasks-list mt-4">
                                <div className="card-header bg-white">
                                    <h5 className="mb-0">Tasks</h5>
                                </div>

                                <div className="card-body">
                                    <div className="list-group">

                                        {tasks.length === 0 && (
                                            <p className="text-muted">No tasks found</p>
                                        )}

                                        {tasks.map(task => (
                                            <div key={task.id} className="list-group-item">
                                                <div className="d-flex justify-content-between">
                                                    <h6>{task.title}</h6>
                                                    <small>
                                                        {task.createdAt
                                                            ? new Date(task.createdAt).toLocaleDateString()
                                                            : ''}
                                                    </small>
                                                </div>

                                                <p className="text-muted small">
                                                    {task.description}
                                                </p>

                                                <div className="d-flex align-items-center gap-2 flex-wrap">
                                                    {task.dueDate && (
                                                        <small className="text-muted">
                                                            📅 {new Date(task.dueDate).toLocaleString()}
                                                        </small>
                                                    )}

                                                    <span className={`badge ${
                                                        task.status === 'completed'
                                                            ? 'bg-success'
                                                            : task.status === 'in-progress'
                                                            ? 'bg-primary'
                                                            : 'bg-warning text-dark'
                                                    }`}>
                                                        {task.status}
                                                    </span>
                                                </div>

                                                <div className="btn-group mt-3">
                                                    <button
                                                        className="btn btn-outline-success btn-sm"
                                                        onClick={() => handleComplete(task.id)}
                                                    >
                                                        Complete
                                                    </button>

                                                    <button
                                                        className="btn btn-outline-danger btn-sm"
                                                        onClick={() => handleDelete(task.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Task;