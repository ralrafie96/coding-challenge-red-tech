
import { Box, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import rtLogo from './red-technologies.png'

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <Box className='nav-bar'>
            <Box className='nav-bar-left' onClick={() => navigate('/dashboard')}>
                <img className="nav-bar-logo" src={rtLogo} alt='Red Technologies' />
                <Typography>Home</Typography>
            </Box>
            <Box className='nav-bar-right'>
                <SettingsIcon />
                <AccountCircleIcon />
            </Box>
        </Box>
    )
}
