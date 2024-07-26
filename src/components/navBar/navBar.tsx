
import React from 'react'

import { Box, Typography, Icon } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const NavBar = () => {
    return (
        <Box className='nav-bar'>
            <Box className='nav-bar-left'>
                <Typography>Home</Typography>
            </Box>
            <Box className='nav-bar-right'>
                <SettingsIcon />
                <AccountCircleIcon />
            </Box>
        </Box>
    )
}
