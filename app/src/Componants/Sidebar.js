import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Typography } from '@mui/material';
import { Home, Mail, TaskAlt, Event, Public, BarChart, MonetizationOn, AddTask } from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Logo imports (replace with your actual logo paths)
import TopLogo from '../images/download.png';
import BottomLogo from '../images/image.png';

const Sidebar = () => {
  const drawerWidth = 220;

  // Menu items with icons
  const menuItems = [
    {
      category: 'Dashboard',
      items: [
        { text: 'Forcast', icon: <BarChart />, link: '/home' },
        // { text: 'Forecast', icon: <Public />, link: '/forecast' },
        // { text: 'Request', icon: <Mail />, link: '/request' },
      ],
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: 'rgb(0,0,0,0.1)',
          borderRight: 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
      }}
    >
      {/* Top Logo Section */}
      <Box sx={{ padding: '16px', textAlign: 'center' }}>
        <img src={TopLogo} alt="Top Logo" style={{ maxWidth: '70%', height: 'auto' }} />
      </Box>

      {/* Menu Items Section */}
      <Box sx={{ overflow: 'auto', mt: -55 }}>
        <List>
          {menuItems.map((menu, menuIndex) => (
            <Box key={menuIndex} sx={{ padding: '0 16px'   }}>
              {/* Render Menu Items */}
              {menu.items.map((item) => (
                <ListItem
                  button
                  key={item.text}
                  component={Link}
                  to={item.link}
                  sx={{
                    width: 180,
                    color: '#333',
                    borderRadius: '8px',
                    margin: '8px 0',
                    backgroundColor: '#f5f5f5', // Default background color as in the image
                    '&:hover': {
                      backgroundColor: '#e0e0e0', // Slightly darker on hover
                      color: '#000',
                    },
                    '&.Mui-selected, &.Mui-selected:hover': {
                      backgroundColor: '#e0e0e0', // Background color for active menu
                      color: '#000',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: '#bbb',
                      minWidth: '40px',
                      '&:hover': { color: '#1976d2' },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: '20px',
                      fontWeight: '500',
                      color: '#333',
                    }}
                  />
                </ListItem>
              ))}
            </Box>
          ))}
        </List>
      </Box>

      {/* Bottom Logo Section */}
      <Box sx={{ padding: '10px', textAlign: 'center' }}>
        <Box>
          <img
            src={BottomLogo}
            alt="Bottom Logo"
            style={{ maxWidth: '50%', height: 'auto', marginTop: '8px' }}
          />
        </Box>
        <Typography variant="caption" sx={{ color: '#888' }}>
          Powered by Code Works
        </Typography>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
