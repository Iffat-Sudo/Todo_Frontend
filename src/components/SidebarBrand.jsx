import React from 'react';
import './SidebarBrand.css';

const SidebarBrand = () => {
    return (
        <div className="col-md-4 d-none d-md-block sidebar-brand">
            <div className="sidebar-content">
                {/* Logo and Brand Section */}
                <div className="brand-section">
                    <div className="logo-container">
                        <i className="bi bi-card-checklist"></i>
                        <h4>To-do App</h4>
                    </div>
                </div>

                {/* Feature Highlights */}
                <div className="features-section">
                    <h2>Welcome Back!</h2>
                    <p className="feature-text">Organize your tasks and boost your productivity</p>

                    <div className="feature-items">
                        <div className="feature-item">
                            <i className="bi bi-check2-circle"></i>
                            <span>Stay organized with task lists</span>
                        </div>
                        <div className="feature-item">
                            <i className="bi bi-calendar-check"></i>
                            <span>Track deadlines effectively</span>
                        </div>
                        <div className="feature-item">
                            <i className="bi bi-graph-up"></i>
                            <span>Monitor your progress</span>
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="sidebar-footer">
                    <p>© 2025 To-do App. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default SidebarBrand;