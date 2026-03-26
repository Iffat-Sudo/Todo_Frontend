
let logoutCallback = null;
let shouldLogout = false;

export const initializeWindowEvents = (callback) => {
    logoutCallback = callback;

    const handleBeforeUnload = (event) => {
        if (logoutCallback) {
            event.preventDefault();
            event.returnValue = '';
            shouldLogout = true;
            return event.returnValue;
        }
    };

    const handleUnload = () => {
        if (shouldLogout) {
            // Get token before clearing storage
            const token = localStorage.getItem('auth_token');

            // Clear storage
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');

            // Make synchronous logout request if we have a token
            if (token) {
                try {
                    const xhr = new XMLHttpRequest();
                    xhr.open('POST', 'http://localhost:9090/api/auth/logout', false); // Synchronous request
                    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.send();
                } catch (error) {
                    // Can't do much about errors during window closing
                    console.error('Logout error during window closing:', error);
                }
            }
        }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);

    return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        window.removeEventListener('unload', handleUnload);
        logoutCallback = null;
        shouldLogout = false;
    };
};

export const removeWindowEvents = () => {
    logoutCallback = null;
    shouldLogout = false;
};