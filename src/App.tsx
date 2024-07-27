import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { RtRoutes } from './components/rtRoutes/rtRoutes';
import { NavBar } from './components/navBar/navBar';
import { Box } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
    return (
        <Box className="app">
            <Provider store={store}>
                <BrowserRouter>
                    <NavBar />
                    <RtRoutes />
                </BrowserRouter>
            </Provider>
        </Box>
    );
}

export default App;
