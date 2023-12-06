import {
  Button,
  Collapse,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { AiOutlineDashboard } from 'react-icons/ai';
import { IoMdKey } from 'react-icons/io';
import { BsPersonVcard } from 'react-icons/bs';
import { FaChartLine } from 'react-icons/fa';
import { BsPersonVideo } from 'react-icons/bs';
import { MdHistory, MdOutlineManageAccounts } from 'react-icons/md';
import React from 'react';
import { getSystemStateValues } from '../../../features/system/systemSlice';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { BsCreditCard } from 'react-icons/bs';
import { BiInfinite } from 'react-icons/bi';
import { MdForwardToInbox } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
const listItems = [
  {
    text: 'Dashboard',
    path: '/dashboard',
    icon: <AiOutlineDashboard size={28} />,
  },
  {
    text: 'Charts',
    path: '/dashboard/history',
    icon: <FaChartLine size={28} />,
  },
  {
    text: 'History',
    path: '/dashboard/history',
    icon: <MdHistory size={28} />,
  },
  {
    text: 'Messages',
    path: '/dashboard/settings',
    icon: <MdForwardToInbox size={28} />,
  },
];

const collapseItems = [
  {
    text: 'Profile',
    path: '/dashboard/starred',
    icon: <BsPersonVcard size={28} />,
  },

  {
    text: 'Security',
    path: '/dashboard/starred',
    icon: <IoMdKey size={28} />,
  },
];

const collapseItems2 = [
  {
    text: 'Billing',
    path: '/dashboard/starred',
    icon: <BsCreditCard size={28} />,
  },
  {
    text: 'Invoices',
    path: '/dashboard/starred',
    icon: <FaFileInvoiceDollar size={28} />,
  },

  {
    text: 'Subscription',
    path: '/dashboard/starred',
    icon: <BiInfinite size={28} />,
  },
];

const initialState = {
  openUser: false,
  openAccount: false,
};
const NavbarDrawerMobile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = React.useState(initialState);
  const { openUser, openAccount } = state;
  const { isMobileNavbarOpen } = useSelector((state) => state.system);

  const handleOpenUser = () => {
    setState({ ...state, openUser: !openUser });
  };

  const handleOpenAccount = () => {
    setState({ ...state, openAccount: !openAccount });
  };
  const closeNavbar = () => {
    dispatch(
      getSystemStateValues({ name: 'isMobileNavbarOpen', value: false })
    );
  };

  const handleLink = (path) => {
    navigate(path);
    closeNavbar();
  };

  return (
    <>
      <Drawer
        anchor='left'
        open={isMobileNavbarOpen}
        onClose={closeNavbar}
        style={{ width: '250px' }}>
        <Wrapper className='drawer'>
          <div className='header'>
            <h4>
              <span>Dryer</span>
              <span>Master</span>
            </h4>
          </div>
          <Divider />
        </Wrapper>
        <List className='list'>
          {listItems.map((item, index) => {
            return (
              <ListItemButton
                key={index}
                component='a'
                onClick={() => handleLink(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            );
          })}
          <Divider />
          <ListItemButton onClick={handleOpenUser}>
            <ListItemIcon>
              <BsPersonVideo size={28} />
            </ListItemIcon>
            <ListItemText primary='User' />
            {openUser ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse
            in={openUser}
            timeout='auto'
            unmountOnExit>
            <List
              component='div'
              disablePadding>
              {collapseItems.map((item, index) => {
                return (
                  <ListItemButton
                    key={index}
                    component='a'
                    onClick={() => handleLink(item.path)}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                );
              })}
            </List>
          </Collapse>
          <Divider />
          <ListItemButton onClick={handleOpenAccount}>
            <ListItemIcon>
              <MdOutlineManageAccounts size={28} />
            </ListItemIcon>
            <ListItemText primary='Account' />
            {openAccount ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse
            in={openAccount}
            timeout='auto'
            unmountOnExit>
            <List
              component='div'
              disablePadding>
              {collapseItems2.map((item, index) => {
                return (
                  <ListItemButton
                    key={index}
                    component='a'
                    onClick={() => handleLink(item.path)}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                );
              })}
            </List>
          </Collapse>
        </List>
        <Button onClick={closeNavbar}>close</Button>
      </Drawer>
    </>
  );
};
const Wrapper = styled.div`
  width: 50vw;
  .header {
    padding-left: 1rem;
    display: flex;
    h4 {
    }
    span:first-of-type {
      color: ${({ theme }) => theme.palette.primary.main};
    }
    //second child
    span:last-of-type {
      color: ${({ theme }) => theme.palette.secondary.main};
    }
    h4 {
      font-size: 1.5rem;
      margin: 0;
      padding: 0.86rem 0;
    }
  }
`;
export default NavbarDrawerMobile;
