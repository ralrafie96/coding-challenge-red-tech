import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { RtRoutes } from './components/rtRoutes/rtRoutes';
import { NavBar } from './components/navBar/navBar';

function App() {
    return (
        <>
            <BrowserRouter>
                <NavBar />
                <RtRoutes />
            </BrowserRouter>
        </>
    );
}

export default App;
