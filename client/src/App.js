import React from 'react';
import Navbar from './components/Navbar';
import Routes from './routes/routes';
import { useLocation } from 'react-router-dom';

function App() {
    const paths = ['/login', '/register'];
    const location = useLocation();

    return (
        <React.Fragment>
            {paths.includes(location.pathname) ? null : <Navbar />}
            <Routes />
        </React.Fragment>
    );
}

export default App;
