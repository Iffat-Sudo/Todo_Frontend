import React from 'react';

import LoginForm from './LoginForm';
import SidebarBrand from './SidebarBrand';

const Login = () => {
    return (
        <div className="container-fluid min-vh-100 p-0">
            <div className="row g-0 h-100">
                <SidebarBrand/>
                <LoginForm/>
            </div>
        </div>
    );
};

export default Login;