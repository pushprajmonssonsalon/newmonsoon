import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import { MdOutlineMenu } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { FaHome, FaShoppingBag } from "react-icons/fa";
import { MdCardMembership } from "react-icons/md";
import { FaRegImages } from 'react-icons/fa6';

export default function Sidebar() {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250,height:"100%",background:"#111212",color:"white"}}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[
          { text: 'Home', icon: <FaHome className='text-white' />, link: '/' },
          { text: 'Franchise', icon: <MdCardMembership className='text-white' />, link: '/franchise-enquiry' },
          { text: 'Gallery', icon: <FaRegImages   className='text-white' />, link: '/gallery' },
          { text: 'Media', icon: <FaRegImages   className='text-white' />, link: '/media' },
          { text: 'About us', icon: <MailIcon className='text-white' />, link: '/about-us' },
          { text: 'Eshop', icon: <FaShoppingBag className='text-white' />, link: 'https://prosaloncart.com' },
        
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.link}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className='bg-primary'>
      {['left']?.map((anchor) => (
        <React.Fragment key={anchor}>
          <MdOutlineMenu onClick={toggleDrawer(anchor, true)} className='text-3xl text-white font-bold'/>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
