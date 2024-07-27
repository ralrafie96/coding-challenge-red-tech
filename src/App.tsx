import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { RtRoutes } from './components/rtRoutes/rtRoutes';
import { NavBar } from './components/navBar/navBar';
import { Box } from '@mui/material';

function App() {
    return (
        <Box className="app">
            <BrowserRouter>
                <NavBar />
                <RtRoutes />
            </BrowserRouter>
        </Box>
    );
}

export default App;
